import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    class Orb {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.dx = (Math.random() - 0.5) * 4 + (Math.random() > 0.5 ? 0.5 : -0.5);
            this.dy = (Math.random() - 0.5) * 4 + (Math.random() > 0.5 ? 0.5 : -0.5);
            this.originalColor = color;
            this.mixedColor = color;
        }

        draw(ctx) {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            gradient.addColorStop(0, this.mixedColor + '99'); // More solid in center
            gradient.addColorStop(0.5, this.mixedColor + '66'); // Semi-transparent
            gradient.addColorStop(1, this.mixedColor + '00'); // Most transparent at edge

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        update(canvas, orbs) {
            // Bounce off walls
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            // Move
            this.x += this.dx;
            this.y += this.dy;

            // Check collision with other orbs
            orbs.forEach(orb => {
                if (orb !== this) {
                    const dx = this.x - orb.x;
                    const dy = this.y - orb.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.radius + orb.radius) {
                        // Mix colors
                        const thisColor = this.originalColor;
                        const otherColor = orb.originalColor;
                        this.mixedColor = mixColors(thisColor, otherColor);
                        orb.mixedColor = mixColors(otherColor, thisColor);
                    } else {
                        // Gradually return to original color
                        this.mixedColor = this.originalColor;
                    }
                }
            });
        }
    }

    function mixColors(color1, color2) {
        // Simple color mixing
        return color1;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Create only 3 orbs
        const colors = ['#4CAF50', '#2196F3', '#9C27B0'];
        const orbs = [];
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? 150 : 300;

        for (let i = 0; i < 3; i++) {
            orbs.push(new Orb(
                Math.random() * (canvas.width - radius * 2) + radius,
                Math.random() * (canvas.height - radius * 2) + radius,
                radius,
                colors[i]
            ));
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            orbs.forEach(orb => {
                orb.update(canvas, orbs);
                orb.draw(ctx);
            });

            requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

export default AnimatedBackground; 