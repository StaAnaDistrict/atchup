    let layer1 = document.getElementById('layer1');
    let layer2 = document.getElementById('layer2');
    let layer3 = document.getElementById('layer3');
    let layer4 = document.getElementById('layer4');
    let layer5 = document.getElementById('layer5');
    let layer6 = document.getElementById('layer6');
    let layer7 = document.getElementById('layer7');
    let layer8 = document.getElementById('layer8');
    let layer9 = document.getElementById('layer9');
    let layer10 = document.getElementById('layer10');
    let layer11 = document.getElementById('layer11');
    let layer12 = document.getElementById('layer12');
    let layer13 = document.getElementById('layer13');
    let layer14 = document.getElementById('layer14');
    let text = document.getElementById('text');
    
    
    // Set initial styles for all layers
    for (let i = 1; i <= 14; i++) {
        let layer = document.getElementById(`layer${i}`);
        if (layer) {
            layer.style.transition = 'opacity 0.5s ease, left 0.5s ease';
        }
    }
    
    // Set initial styles for all layers
    for (let i = 1; i <= 14; i++) {
        let layer = document.getElementById(`layer${i}`);
        if (layer) {
            layer.style.transition = 'opacity 0.5s ease-out, left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
    }
    
    // Set initial styles for layer14
    layer14.style.opacity = '0';
    
    window.addEventListener('scroll', () => {
        let value = window.scrollY;
        let windowWidth = window.innerWidth;
        
        for (let i = 2; i <= 14; i++) {
            let layer = document.getElementById(`layer${i}`);
            if (layer) {
                let moveDistance = value * 10;
                let opacity = 1;

                if (i <= 10) {
                    layer.style.left = `-${moveDistance}px`;
                    opacity = Math.max(0, 1 - (moveDistance / windowWidth));
                } else if (i <= 13) {
                    layer.style.left = `${moveDistance}px`;
                    opacity = Math.max(0, 1 - (moveDistance / windowWidth));
                } else if (i === 14) {
                    // Gradually show layer14 as user scrolls
                    opacity = Math.min(value / 100, 1);  // Adjust 100 to control fade-in speed
                }

                layer.style.opacity = opacity;
            }
        }

        // Optional: hide the original text as layer14 appears
        if (text) {
            let opacity = Math.max(0, 1 - value / 100);
            text.style.opacity = opacity;
        }
    });
