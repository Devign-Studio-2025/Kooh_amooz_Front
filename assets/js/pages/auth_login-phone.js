// ================== Form State Manager and button state management ================== //
// Monitors form fields in real-time and updates submit button accordingly

class FormStateManager {
  constructor() {
    // Form and button selectors
    this.formId = "#login-phone-form";
    this.submitBtnId = "#login-phone-submit-btn";

    this.requiredFields = ["#phone-number"];

    this.validator = null; // Will hold JustValidate instance
    this.init();
  }

  // Initialize form validation and state management

  init() {
    this.initializeValidation();
    this.bindRealTimeValidation();
    this.updateButtonState();
  }

  // Initialize JustValidate with custom rules and configuration
  initializeValidation() {
    const validateOptions = {
      errorFieldCssClass: "border-error",
      errorLabelStyle: {
        color: "var(--Color-Text-icon-on-subtle-error)",
        font: "var(--Font-Caption-bold-style)",
        marginTop: "var(--Spacing-sm)",
        display: "block",
      },
      successFieldCssClass: "is-valid",
      validateOnBlur: true, // Validate when field loses focus
      focusInvalidField: true, // Auto-focus first invalid field
      lockForm: false, // Don't lock form on validation failure
    };

    this.validator = new JustValidate(this.formId, validateOptions);

    // validation rules
    this.validator
      .addField(
        "#phone-number",
        [
          {
            rule: "required",
            errorMessage: "شماره همراه الزامی است",
          },
          {
            rule: "number",
            errorMessage: "فقط عدد مجاز است",
          },
          {
            rule: "minLength",
            value: 11,
            errorMessage: "شماره باید ۱۱ رقمی باشد",
          },
          {
            rule: "maxLength",
            value: 11,
            errorMessage: "شماره باید ۱۱ رقمی باشد",
          },
          {
            rule: "customRegexp",
            value: /^09[0-9]{9}$/,
            errorMessage: "شماره موبایل معتبر وارد کنید ",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#phone-number")
            .closest(".input__with-error-wrapper"),
        }
      )
      .onSuccess(() => {
        this.handleFormSubmission();
      })
      .onFail(() => {
        // When validation fails, update button state
        this.updateButtonState();
      });
  }

  /**
   * Bind real-time validation monitoring to all form fields
   * This ensures button state updates immediately when fields change
   */
  bindRealTimeValidation() {
    // Monitor input events on all required fields
    this.requiredFields.forEach((field) => {
      $(document).on("input change", field, () => {
        this.updateButtonState();
      });
    });
  }

  /**
   * Update submit button state based on form validity
   * Enables button and adds primary style when form is valid
   * Disables button and adds disabled style when form is invalid
   */
  updateButtonState() {
    const submitBtn = document.querySelector(this.submitBtnId);
    const isFormValid = this.isFormValid();

    if (isFormValid) {
      // Form is valid - enable button with primary style
      submitBtn.disabled = false;
      submitBtn.classList.remove("button--disabled");
      submitBtn.classList.add("button--primary");
    } else {
      // Form is invalid - disable button with disabled style
      submitBtn.disabled = true;
      submitBtn.classList.add("button--disabled");
      submitBtn.classList.remove("button--primary");
    }
  }

  /**
   * Check if all form fields are valid
   * @returns {boolean} True if form is valid, false otherwise
   */
  isFormValid() {
    // Check if all required fields have values
    const fieldsValid = this.requiredFields.every((field) => {
      const element = document.querySelector(field);
      if (!element) return false;

      // For text inputs, check if value is not empty
      return element.value.trim() !== "";
    });

    return fieldsValid;
  }

  /**
   * Handle form submission when validation passes
   * Updates button state and submits the form
   */
  handleFormSubmission() {
    const submitBtn = document.querySelector(this.submitBtnId);

    // Update button to show loading state
    submitBtn.disabled = true;
    submitBtn.classList.remove("button--disabled");
    submitBtn.classList.add("button--primary");

    // Change button text to indicate processing
    submitBtn.querySelector(".button__text").textContent = "در حال ثبت...";

    // Submit the form (this will send data to backend)
    document.querySelector(this.formId).submit();
  }
}

// ================== Initialize All Managers ================== //
// This section initializes all functionality when document is ready
// All managers are attached to window for global access if needed

$(document).ready(function () {
  // Initialize form validation and button state manager
  window.formStateManager = new FormStateManager();

  // Log initialization for debugging
  console.log("All form managers initialized successfully");
});
