// ================== Select2 Province-City Manager ================== //
// This class manages the province and city dropdowns with Select2
// Backend developer: When API is ready, update endpoints and replace mock data
class ProvinceCityManager {
  constructor() {
    this.selectors = {
      province: ".select2-province",
      city: ".select2-city",
    };

    this.endpoints = {
      cities: "/api/cities", // Backend: Update this endpoint
    };

    // Mock data (remove when API is ready)
    this.mockData = {
      1: [
        { id: "1", text: "تهران" },
        { id: "2", text: "کرج" },
        { id: "3", text: "شهریار" },
        { id: "4", text: "اسلامشهر" },
        { id: "5", text: "رباط کریم" },
      ],
      2: [
        { id: "6", text: "اصفهان" },
        { id: "7", text: "کاشان" },
        { id: "8", text: "نجف آباد" },
        { id: "9", text: "خمینی شهر" },
        { id: "10", text: "شاهین شهر" },
      ],
      3: [
        { id: "11", text: "شیراز" },
        { id: "12", text: "مرودشت" },
        { id: "13", text: "کازرون" },
        { id: "14", text: "لار" },
        { id: "15", text: "جهرم" },
      ],
      4: [
        { id: "16", text: "مشهد" },
        { id: "17", text: "نیشابور" },
        { id: "18", text: "سبزوار" },
        { id: "19", text: "تربت حیدریه" },
        { id: "20", text: "قوچان" },
      ],
    };

    this.init();
  }

  init() {
    this.initializeSelect2();
    this.bindEvents();
    this.loadInitialProvinces();
  }

  // Initialize Select2 with common configuration
  initializeSelect2() {
    const commonConfig = {
      allowClear: false,
      width: "resolve",
      language: {
        noResults: () => "نتیجه‌ای یافت نشد",
        searching: () => "در حال جستجو...",
        loadingMore: () => "در حال بارگذاری بیشتر...",
        errorLoading: () => "خطا در بارگذاری نتایج",
      },
    };

    // Initialize province select
    $(this.selectors.province).select2({
      ...commonConfig,
      placeholder: "استان",
    });

    // Initialize city select (initially disabled)
    $(this.selectors.city).select2({
      ...commonConfig,
      placeholder: "شهر",
      disabled: true,
    });
  }

  // Load initial provinces (using mock data for now)
  loadInitialProvinces() {
    const provinces = [
      { id: "1", text: "تهران" },
      { id: "2", text: "اصفهان" },
      { id: "3", text: "فارس" },
      { id: "4", text: "خراسان رضوی" },
      { id: "5", text: "آذربایجان شرقی" },
      { id: "6", text: "مازندران" },
      { id: "7", text: "گیلان" },
      { id: "8", text: "البرز" },
    ];

    const $provinceSelect = $(this.selectors.province);
    $provinceSelect.empty().append('<option value=""></option>');

    provinces.forEach((province) => {
      $provinceSelect.append(
        $("<option></option>").val(province.id).text(province.text)
      );
    });
  }

  // Bind all event listeners
  bindEvents() {
    // Province change event
    $(this.selectors.province).on(
      "change",
      this.handleProvinceChange.bind(this)
    );

    // City change event for potential additional handling
    $(this.selectors.city).on("change", this.handleCityChange.bind(this));
  }

  // Handle province selection change
  async handleProvinceChange(event) {
    const provinceId = $(event.target).val();
    const $citySelect = $(this.selectors.city);

    if (!provinceId) {
      this.resetCitySelect("ابتدا استان را انتخاب کنید");
      return;
    }

    try {
      // Show loading state
      this.setCityLoadingState(true);

      // Load cities for selected province
      const cities = await this.loadCities(provinceId);

      // Update city dropdown with new data
      this.updateCityOptions(cities);

      // Enable city select
      this.setCityLoadingState(false);

      // Notify about successful load
      this.notifyCityLoadComplete(provinceId, cities.length);
    } catch (error) {
      console.error("Error loading cities:", error);
      this.handleCityLoadError(provinceId);
    }
  }

  /**
   * Load cities (currently using mock data)
   * Backend: Replace this with actual API call when ready
   */
  async loadCities(provinceId) {
    // Simulate API delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Backend developer: REPLACE THIS BLOCK WITH REAL API CALL
    // ========== START OF MOCK DATA (REMOVE WHEN API READY) ========== //
    if (this.mockData[provinceId]) {
      return this.mockData[provinceId];
    }

    // If province not found in mock data, return empty array
    console.warn(`No cities found for province ID: ${provinceId}`);
    return [];
    // ========== END OF MOCK DATA ========== //

    /* Backend developer: UNCOMMENT THIS WHEN API IS READY
                const response = await $.ajax({
                    url: this.endpoints.cities,
                    method: 'GET',
                    data: { province_id: provinceId },
                    dataType: 'json',
                    timeout: 10000
                });
        
                if (!response.success) {
                    throw new Error(response.message || 'Failed to load cities');
                }
        
                return response.data || [];
                */
  }

  // Update city select options with new data
  updateCityOptions(cities) {
    const $citySelect = $(this.selectors.city);

    // Clear existing options and add empty option
    $citySelect.empty().append('<option value=""></option>');

    // Add new city options
    cities.forEach((city) => {
      $citySelect.append($("<option></option>").val(city.id).text(city.text));
    });

    // Update Select2
    $citySelect.trigger("change.select2");
  }

  // Set loading state for city select
  setCityLoadingState(loading) {
    const $citySelect = $(this.selectors.city);

    if (loading) {
      $citySelect
        .empty()
        .append('<option value="">در حال بارگذاری شهرها...</option>');
      $citySelect.prop("disabled", true);
    } else {
      $citySelect.prop("disabled", false);
      $citySelect.attr("placeholder", "شهر را انتخاب کنید");
    }

    $citySelect.trigger("change.select2");
  }

  // Reset city select to initial state
  resetCitySelect(placeholder = "شهر") {
    const $citySelect = $(this.selectors.city);
    $citySelect.empty().append('<option value=""></option>');
    $citySelect.prop("disabled", true);
    $citySelect.attr("placeholder", placeholder);
    $citySelect.trigger("change.select2");
  }

  // Handle city selection change
  handleCityChange(event) {
    const cityId = $(event.target).val();
    // Optional: Add additional city change handling here

    // Emit custom event for other components to listen to
    $(document).trigger("city:changed", { cityId });
  }

  // Handle errors during city loading
  handleCityLoadError(provinceId) {
    this.resetCitySelect("خطا در بارگذاری شهرها");

    console.error("Error loading cities for province:", provinceId);

    // Emit error event for monitoring
    $(document).trigger("city:loadError", { provinceId });
  }

  // Notify when cities are loaded successfully
  notifyCityLoadComplete(provinceId, cityCount) {
    $(document).trigger("city:loadComplete", {
      provinceId,
      cityCount,
    });
  }

  // Public method to manually set province (useful for form editing)
  async setProvince(provinceId, cityId = null) {
    $(this.selectors.province).val(provinceId).trigger("change");

    // Wait for cities to load then set city if provided
    if (cityId) {
      setTimeout(async () => {
        $(this.selectors.city).val(cityId).trigger("change");
      }, 500);
    }
  }

  // Public method to get current selection
  getSelection() {
    return {
      province: {
        id: $(this.selectors.province).val(),
        text: $(this.selectors.province).find("option:selected").text(),
      },
      city: {
        id: $(this.selectors.city).val(),
        text: $(this.selectors.city).find("option:selected").text(),
      },
    };
  }

  // Public method to reset both selects
  reset() {
    $(this.selectors.province).val("").trigger("change");
    this.resetCitySelect();
  }
}

// ================== Password Toggle Manager ================== //
class PasswordToggleManager {
  constructor() {
    this.selectors = {
      passwordToggle: ".password-toggle", // Eye icon for password field
      confirmPasswordToggle: ".confirm-password-toggle", // Eye icon for confirm password
      passwordField: "#password", // Password input field
      confirmPasswordField: "#confirm-password", // Confirm password input field
    };

    this.init();
  }

  // Initialize password toggle functionality
  init() {
    this.bindEvents();
  }

  // Bind click events to password toggle icons
  bindEvents() {
    // Password field toggle
    $(this.selectors.passwordToggle).on("click", (e) => {
      this.togglePasswordVisibility(
        this.selectors.passwordField,
        this.selectors.passwordToggle
      );
    });

    // Confirm password field toggle
    $(this.selectors.confirmPasswordToggle).on("click", (e) => {
      this.togglePasswordVisibility(
        this.selectors.confirmPasswordField,
        this.selectors.confirmPasswordToggle
      );
    });
  }

  /**
   * Toggle password visibility between text and password types
   * @param {string} fieldSelector - Selector for the input field
   * @param {string} toggleSelector - Selector for the toggle icon
   */
  togglePasswordVisibility(fieldSelector, toggleSelector) {
    const $field = $(fieldSelector);
    const $toggle = $(toggleSelector);
    const $icon = $toggle.find("use");

    // Toggle input type between password and text
    if ($field.attr("type") === "password") {
      $field.attr("type", "text");
      // Change icon (visible state)
      $icon.attr("href", "assets/icons/sprites.svg#vuesax/bold/eye");
    } else {
      $field.attr("type", "password");
      // Change icon (hidden state)
      $icon.attr("href", "assets/icons/sprites.svg#vuesax/bulk/eye-slash");
    }
  }
}

// ================== Form State Manager and button state management ================== //
// Monitors form fields in real-time and updates submit button accordingly

class FormStateManager {
  constructor() {
    // selectors
    this.formId = "#register-form";
    this.submitBtnId = "#register-submit-btn";

    this.requiredFields = [
      "#full-name",
      "#phone-number",
      "#province-select",
      "#city-select",
      "#password",
      "#confirm-password",
    ];

    this.validator = null; // Will hold JustValidate instance
    this.init();
  }

  // Initialize form validation and state management
  init() {
    this.initializeValidation();
    this.bindRealTimeValidation();
    this.updateButtonState(); // Set initial button state
  }

  // Initialize JustValidate
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
        "#full-name",
        [
          {
            rule: "required",
            errorMessage: "نام و نام خانوادگی الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#full-name")
            .closest(".input__with-error-wrapper"),
        }
      )
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
      .addField(
        "#province-select",
        [
          {
            rule: "required",
            errorMessage: "انتخاب استان الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#province-select")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#city-select",
        [
          {
            rule: "required",
            errorMessage: "انتخاب شهر الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#city-select")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#password",
        [
          {
            rule: "required",
            errorMessage: "رمز عبور الزامی است",
          },
          {
            rule: "minLength",
            value: 6,
            errorMessage: "رمز عبور باید حداقل ۶ کاراکتر باشد",
          },
          {
            rule: "maxLength",
            value: 20,
            errorMessage: "رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#password")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#confirm-password",
        [
          {
            rule: "required",
            errorMessage: "تکرار رمز عبور الزامی است",
          },
          {
            validator: (value, fields) => {
              if (fields["#password"] && fields["#password"].elem) {
                return value === fields["#password"].elem.value;
              }
              return false;
            },
            errorMessage: "رمز عبور و تکرار آن باید یکسان باشند",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#confirm-password")
            .closest(".input__with-error-wrapper"),
        }
      )
      .onSuccess(() => {
        this.handleFormSubmission();
      })
      .onFail(() => {
        this.updateButtonState();
      });
  }

  // This ensures button state updates immediately when fields change
  bindRealTimeValidation() {
    // Monitor input events on all required fields
    this.requiredFields.forEach((field) => {
      $(document).on("input change", field, () => {
        this.updateButtonState();
      });
    });

    // Special handling for Select2 dropdowns
    $(document).on("change", ".select2-province, .select2-city", () => {
      this.updateButtonState();
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

      // Handle different field types
      if (element.type === "select-one") {
        // For dropdowns, check if a value is selected
        return element.value !== "";
      }

      // For text inputs, check if value is not empty
      return element.value.trim() !== "";
    });

    // Additional validation: Check if passwords match
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;
    const passwordsMatch = password === confirmPassword;

    return fieldsValid && passwordsMatch;
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

    // Submit the form
    document.querySelector(this.formId).submit();
  }
}

// ================== Initialize All Managers ================== //
// This section initializes all functionality when document is ready
// All managers are attached to window for global access if needed

$(document).ready(function () {
  // Initialize Province-City dropdown manager
  window.provinceCityManager = new ProvinceCityManager();

  // Initialize password visibility toggle manager
  window.passwordToggleManager = new PasswordToggleManager();

  // Initialize form validation and button state manager
  window.formStateManager = new FormStateManager();

  // Log initialization for debugging
  console.log("All form managers initialized successfully");
  console.log(
    "Available managers: provinceCityManager, passwordToggleManager, formStateManager"
  );
});
