// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.comparison-slider');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');

    let isDragging = false;

    // Start dragging on mouse down or touch start
    sliderHandle.addEventListener('pointerdown', (e) => {
        isDragging = true;
        // Prevents default drag behavior (e.g., image ghosting)
        e.preventDefault(); 
    });

    // Stop dragging on mouse up or touch end anywhere on the page
    window.addEventListener('pointerup', () => {
        isDragging = false;
    });

    // Move the slider on mouse move or touch move
    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;

        // Get the bounding box of the container
        const rect = sliderContainer.getBoundingClientRect();
        
        // Calculate the position of the pointer relative to the container
        // Ensure the position is within the container's bounds (0 to rect.width)
        let newX = e.clientX - rect.left;
        newX = Math.max(0, Math.min(newX, rect.width));

        // Convert the position to a percentage
        const newWidth = (newX / rect.width) * 100;
        
        // Update the width of the after-image and the position of the handle
        afterImage.style.width = `${newWidth}%`;
        sliderHandle.style.left = `${newWidth}%`;
    });
});