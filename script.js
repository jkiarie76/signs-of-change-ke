/**
 * HANDS & VOICES - MAIN UNIFIED NAVIGATION & INTERACTION SCRIPT
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. GLOBAL COMPONENTS (Runs on all pages)
    // ==========================================================================
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            if (mobileNav.classList.contains('open')) {
                mobileMenuBtn.textContent = '✕';
            } else {
                mobileMenuBtn.textContent = '☰';
            }
        });
    }

    // Mobile Dropdown Sub-menu Toggle
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdownParent = document.getElementById('mobile-dropdown-parent');

    if (mobileDropdownTrigger && mobileDropdownParent) {
        mobileDropdownTrigger.addEventListener('click', (e) => {
            // Prevent navigating to '#' or a dead link when opening the drawer
            e.preventDefault(); 
            
            // Toggle the active class to expand the menu
            mobileDropdownParent.classList.toggle('open-dropdown');
        });
    }

    // Newsletter Form Submission Prevention
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const emailInput = newsletterForm.querySelector('input[type="email"]').value;
            if (emailInput) {
                alert(`Thanks for subscribing with: ${emailInput}!`);
                newsletterForm.reset(); 
            }
        });
    }

    // ==========================================================================
    // 2. LEARN SIGN INTERACTIVE GRID MODULE (Runs safely only on Learn page)
    // ==========================================================================
    const btnGrid = document.getElementById('character-buttons-grid');
    
    // The engine only runs if 'character-buttons-grid' exists in the HTML
    if (btnGrid) {
        const signDatabase = {
            'A-Z': [
                { char: 'A', desc: 'Closed fist, thumb rests along the side.' },
                { char: 'B', desc: 'Open flat hand, fingers straight up, thumb folded across palm.' },
                { char: 'C', desc: 'Curved handshape forming an open crescent moon profile.' },
                { char: 'D', desc: 'Index finger pointing straight up, remaining fingers closed forming a ring.' },
                { char: 'E', desc: 'Fingers curled tightly over the palm, thumb resting underneath tips.' },
                { char: 'F', desc: 'Index finger and thumb forming a ring, remaining three fingers extended straight.' },
                { char: 'G', desc: 'Thumb and index pointer extended outward parallel, like an explicit pinch.' },
                { char: 'H', desc: 'Index and middle fingers extended straight outward parallel next to each other.' },
                { char: 'I', desc: 'Pinky finger extended straight up, other fingers closed in a clean fist.' },
                { char: 'J', desc: 'Pinky finger points up and sweeps down drawing a hook curve trajectory through space.' },
                { char: 'K', desc: 'Index and middle fingers extended upward with the thumb knuckle supporting between them.' },
                { char: 'L', desc: 'Index finger vertical and thumb horizontal forming a precise perpendicular right angle.' },
                { char: 'M', desc: 'Thumb tucked safely underneath your first three fingers down against the palm.' },
                { char: 'N', desc: 'Thumb tucked smoothly underneath your first two fingers flat down against the palm.' },
                { char: 'O', desc: 'Fingers all curved down symmetrically touching the thumb to make a perfect circle.' },
                { char: 'P', desc: 'Downward-directed variant of the K configuration, pointing towards the floor space.' },
                { char: 'Q', desc: 'Downward-directed variant of the G configuration, pointing straight down.' },
                { char: 'R', desc: 'Index and middle fingers crossed snugly together like a good luck token gesture.' },
                { char: 'S', desc: 'Clenched tight closed fist with the thumb folded squarely over the middle fingers.' },
                { char: 'T', desc: 'Thumb tucked underneath the index finger node while other fingers remain clenched.' },
                { char: 'U', desc: 'Index and middle fingers extended straight up standing completely flush together.' },
                { char: 'V', desc: 'Index and middle fingers extended outward apart forming a victory peace split.' },
                { char: 'W', desc: 'Three middle fingers extended straight out apart forming a structural triple spike.' },
                { char: 'X', desc: 'Index finger curved up into a clean hook shape, remaining fingers folded.' },
                { char: 'Y', desc: 'Thumb and pinky finger extended fully outward, middle three fingers down flat.' },
                { char: 'Z', desc: 'Index finger extended out draws an explicit zig-zag trajectory vector across empty space.' }
            ],
            '0-9': [
                { char: '0', desc: 'All fingers curved cleanly meeting the thumb pad securely to signify zero.' },
                { char: '1', desc: 'Index finger pointing straight up, back of the hand facing outwards to viewer.' },
                { char: '2', desc: 'Index and middle fingers extended vertically upright, spaced cleanly.' },
                { char: '3', desc: 'Show your thumb, index finger, and middle finger.' },
                { char: '4', desc: 'Four distinct fingers extended straight up, thumb tucked inward over palm.' },
                { char: '5', desc: 'All five digits completely spread open wide, palm facing standard viewer.' },
                { char: '6', desc: 'Pinky finger tip touches thumb pad explicitly, remaining three fingers extended upright.' },
                { char: '7', desc: 'Show two fingers on your right hand resting on a closed left fist.' },
                { char: '8', desc: 'Show three fingers on your right hand resting on a closed left fist.' },
                { char: '9', desc: 'Show four fingers on your right hand resting on a closed left fist.' },
                { char: '10', desc: 'Bring both of your closed fists together.' }
            ]
        };

        let activeTab = 'A-Z';
        const toggleAZ = document.getElementById('toggle-az');
        const toggle09 = document.getElementById('toggle-09');
        
        const previewAvatar = document.getElementById('preview-avatar');
        const previewTitle = document.getElementById('preview-title');
        const previewDesc = document.getElementById('preview-desc');

        function populateGrid(mode) {
            btnGrid.innerHTML = '';
            const datasets = signDatabase[mode];

            datasets.forEach((item, index) => {
                const button = document.createElement('button');
                button.classList.add('char-select-item');
                button.innerText = item.char;
                
                if (index === 0) {
                    button.classList.add('active-selection');
                    updatePreviewDisplay(item.char, item.desc);
                }

                button.addEventListener('click', () => {
                    document.querySelectorAll('.char-select-item').forEach(b => {
                        b.classList.remove('active-selection');
                    });
                    button.classList.add('active-selection');
                    updatePreviewDisplay(item.char, item.desc);
                });

                btnGrid.appendChild(button);
            });
        }

        function updatePreviewDisplay(character, description) {
            if (previewAvatar) previewAvatar.innerText = character;
            if (previewTitle) previewTitle.innerText = `Sign for "${character}"`;
            if (previewDesc) previewDesc.innerText = description;
        }

        if (toggleAZ) {
            toggleAZ.addEventListener('click', () => {
                if (activeTab === 'A-Z') return;
                activeTab = 'A-Z';
                toggleAZ.classList.add('active');
                if (toggle09) toggle09.classList.remove('active');
                populateGrid('A-Z');
            });
        }

        if (toggle09) {
            toggle09.addEventListener('click', () => {
                if (activeTab === '0-9') return;
                activeTab = '0-9';
                toggle09.classList.add('active');
                if (toggleAZ) toggleAZ.classList.remove('active');
                populateGrid('0-9');
            });
        }

        // Initialize grid on page load
        populateGrid('A-Z');
    }

    // ==========================================================================
    // 3. ABOUT PAGE: HISTORICAL TIMELINE EXPANDER MODULE
    // ==========================================================================
    const toggleBtn = document.getElementById("see-full-history-btn");
    const extendedTimeline = document.getElementById("timeline-extended");

    if (toggleBtn && extendedTimeline) {
        toggleBtn.addEventListener("click", function () {
            // Check if it's currently expanded
            const isExpanded = extendedTimeline.classList.toggle("is-expanded");
            
            // Switch text content dynamically
            if (isExpanded) {
                toggleBtn.innerHTML = "Show Less ▲";
            } else {
                toggleBtn.innerHTML = "See Full History ▼";
                
                // Smoothly scroll back slightly if user collapses long items
                extendedTimeline.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // ==========================================================================
    // 4. CONNECT PAGE: INTERACTIVE VIDEO HERO MODAL
    // ==========================================================================
    const openModalBtn = document.getElementById('open-welcome-modal');
    const closeModalBtn = document.getElementById('close-welcome-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const videoModal = document.getElementById('welcome-video-modal');
    const modalPlayer = document.getElementById('modal-player');

    if (openModalBtn && videoModal && modalPlayer) {
        // Open Modal and Play Video
        openModalBtn.addEventListener('click', () => {
            videoModal.classList.add('show');
            modalPlayer.currentTime = 0; // Starts clean from the beginning
            modalPlayer.play();
        });

        // Handle closing events safely
        const closeModal = () => {
            videoModal.classList.remove('show');
            modalPlayer.pause(); // Instantly stops playback sound when hidden
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

        // Safeguard: Allow escaping the video view by hitting the "Escape" key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('show')) {
                closeModal();
            }
        });
    }

    // ==========================================================================
    // 5. CONNECT PAGE: INTERACTIVE ACCORDION TOGGLE MODULE
    // ==========================================================================
    // FAQ Accordion - Isolated Protection Block
    try {
        const accordionTriggers = document.querySelectorAll('.accordion-trigger');
        
        if (accordionTriggers.length === 0) {
            console.warn("FAQ Accordion Trigger warning: No elements found with class '.accordion-trigger'. Check your HTML structure.");
        }

        accordionTriggers.forEach(trigger => {
            trigger.onclick = function(e) {
                e.preventDefault(); // Stop any accidental form or anchor submissions
                
                const currentItem = this.parentElement;
                const currentPanel = currentItem.querySelector('.accordion-content-panel');
                const currentChevron = this.querySelector('.fa-chevron-down');
                
                if (!currentPanel) {
                    console.error("FAQ Error: Could not find '.accordion-content-panel' inside the accordion-item.");
                    return;
                }

                // Toggle active state
                const isActive = currentItem.classList.toggle('active');
                
                // Absolute direct fallback style injection
                if (isActive) {
                    currentPanel.style.display = "block";
                    currentPanel.style.maxHeight = "500px";
                    currentPanel.style.opacity = "1";
                    currentPanel.style.visibility = "visible";
                    if (currentChevron) currentChevron.style.transform = "rotate(180deg)";
                } else {
                    currentPanel.style.display = "none";
                    currentPanel.style.maxHeight = "0";
                    currentPanel.style.opacity = "0";
                    currentPanel.style.visibility = "hidden";
                    if (currentChevron) currentChevron.style.transform = "rotate(0deg)";
                }
            };
        });
    } catch (faqError) {
        console.error("Critical error inside FAQ script execution:", faqError);
    }

    // Connect Contact Form submission validation
    const connectForm = document.getElementById('connect-contact-form');
    if (connectForm) {
        connectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            if (name) {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                connectForm.reset();
            }
        });
    }
});