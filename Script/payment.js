/**
 * Talent Grow - Payment Console Ecosystem
 * Operational Interaction Handling Framework
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Core Dynamic Totals Compilation
    evaluateCartFinancials();

    // 2. Setup Gateway Method Toggles
    initGatewayProviderTabs();

    // 3. Mount Auto-Formatting Input Masks
    initPaymentInputMasks();

    // 4. Form Submission and Error Catch Pipeline
    initCheckoutValidation();
});

/**
 * Automatically reads and compiles dynamic cart prices inside sidebar
 */
function evaluateCartFinancials() {
    const itemPrices = document.querySelectorAll(".item-price");
    let subtotalAccumulator = 0;

    // Capture values from custom data-value attribute
    itemPrices.forEach(priceNode => {
        const value = parseFloat(priceNode.getAttribute("data-value") || 0);
        subtotalAccumulator += value;
    });

    const taxElement = document.getElementById("tax-val");
    const taxValue = parseFloat(taxElement ? taxElement.innerText : 0);
    
    // Final aggregate summation
    const dynamicTotal = subtotalAccumulator + taxValue;

    // Inject calculations cleanly into UI bindings
    const subtotalContainer = document.getElementById("subtotal-val");
    const totalContainer = document.getElementById("total-val");

    if (subtotalContainer && totalContainer) {
        subtotalContainer.innerText = `$${subtotalAccumulator.toFixed(2)}`;
        totalContainer.innerText = `$${dynamicTotal.toFixed(2)}`;
    }
}

/**
 * Handles highlight switching across payment method selectors
 */
function initGatewayProviderTabs() {
    const providerTabs = document.querySelectorAll(".provider-tab");
    
    providerTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Drop current active classes
            providerTabs.forEach(t => t.classList.remove("active"));
            
            // Allocate to selected click context
            tab.classList.add("active");
            
            const targetGateway = tab.getAttribute("data-provider");
            console.log(`LMS Terminal Environment Channel shifted: [${targetGateway.toUpperCase()}]`);
        });
    });
}

/**
 * Applies keystroke string filters to help structure credit card strings correctly
 */
function initPaymentInputMasks() {
    const cardNumberInput = document.getElementById("card-number");
    const cardExpiryInput = document.getElementById("card-expiry");

    // Card formatting mask structure: 4-4-4-4 configuration
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, ""); // Strip non-numeric assets
            let matches = value.match(/.{1,4}/g);
            e.target.value = matches ? matches.join(" ") : value;
        });
    }

    // Expiry verification format helper: MM/YY
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 2) {
                e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }
}

/**
 * Validates criteria structures on execution attempts before hitting fake production loop
 */
function initCheckoutValidation() {
    const checkoutForm = document.getElementById("lms-payment-form");
    
    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let passStatus = true;

        // Loop over targets needing active strings
        checkoutForm.querySelectorAll("input[required]").forEach(input => {
            const fieldGroup = input.parentElement;
            
            // Deep check string layers
            if (!input.value.trim()) {
                fieldGroup.classList.add("invalid");
                passStatus = false;
            }
            // Strict check minimum length constraint profiles
            else if (input.id === "card-number" && input.value.trim().length < 19) {
                fieldGroup.classList.add("invalid");
                passStatus = false;
            } 
            else if (input.id === "card-expiry" && input.value.trim().length < 5) {
                fieldGroup.classList.add("invalid");
                passStatus = false;
            }
            else if (input.id === "card-cvc" && input.value.trim().length < 3) {
                fieldGroup.classList.add("invalid");
                passStatus = false;
            }
            else {
                fieldGroup.classList.remove("invalid");
            }
        });

        // Trigger secure process transition animations if validations clear
        if (passStatus) {
            const paymentSubmitBtn = document.getElementById("submit-pay-btn");
            const baseBtnText = paymentSubmitBtn.innerText;

            paymentSubmitBtn.innerText = "Authorizing Secure Payment...";
            paymentSubmitBtn.style.backgroundColor = "var(--success-green)";
            paymentSubmitBtn.style.pointerEvents = "none";

            setTimeout(() => {
                alert("🎉 Order Verified! Payment authorized successfully, courses are active now.");
                
                // Reset form configurations back to standard values
                paymentSubmitBtn.innerText = baseBtnText;
                paymentSubmitBtn.style.backgroundColor = "var(--primary-teal)";
                paymentSubmitBtn.style.pointerEvents = "auto";
                checkoutForm.reset();
                evaluateCartFinancials(); // Refresh balance indicators
            }, 2000);
        }
    });
}