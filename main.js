document.addEventListener('DOMContentLoaded', () => {
    // Configuration - Replace with your n8n Production Webhook URL
    const N8N_WEBHOOK_URL = 'https://n8n.aiporvos.com/webhook-test/influencer-studio';

    // File Previews
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
        const input = zone.querySelector('input');
        const preview = zone.querySelector('.preview');

        zone.addEventListener('change', (e) => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.style.backgroundImage = `url(${e.target.result})`;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        // Drag & Drop effects
        zone.addEventListener('dragover', () => zone.classList.add('drag-over'));
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', () => zone.classList.remove('drag-over'));
    });

    // Number Controls
    const numControls = document.querySelectorAll('.number-control');
    numControls.forEach(ctrl => {
        const input = ctrl.querySelector('input');
        const minus = ctrl.querySelector('.minus');
        const plus = ctrl.querySelector('.plus');

        minus.addEventListener('click', () => {
            if (input.value > parseInt(input.min)) input.value = parseInt(input.value) - 1;
        });
        plus.addEventListener('click', () => {
            if (input.value < parseInt(input.max)) input.value = parseInt(input.value) + 1;
        });
    });

    // Form Submission
    const form = document.getElementById('influencerForm');
    const submitBtn = document.getElementById('submitBtn');
    const successOverlay = document.getElementById('successOverlay');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                successOverlay.classList.add('visible');
                form.reset();
                document.querySelectorAll('.preview').forEach(p => p.style.display = 'none');
            } else {
                alert('Hubo un error al conectar con el servidor. Por favor, verifica tu webhook.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión. Asegúrate de que el Webhook de n8n esté activo.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});

function closeSuccess() {
    document.getElementById('successOverlay').classList.remove('visible');
}
