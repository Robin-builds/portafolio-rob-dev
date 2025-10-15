// =============================================
// LÓGICA GLOBAL PARA EL CAMBIO DE TEMA
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-checkbox');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('light-mode');
            themeToggle.checked = false;
        }
    };

    // Al cargar la página, comprueba si hay un tema guardado
    const savedTheme = localStorage.getItem('theme') || 'dark'; // 'dark' por defecto
    applyTheme(savedTheme);

    // Event listener para el cambio de tema
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});