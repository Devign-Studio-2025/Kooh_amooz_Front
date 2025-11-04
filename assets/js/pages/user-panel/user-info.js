import "../../../libs/jquery/jquery-3.7.1.min.js";
import "../../../libs/select2/select2.min.js";
import "../../../libs/validate.min.js/just-validate.production.min.js";
import "../../../libs/JalaliDatePicker/jalalidatepicker.min.js";

// Initialize Jalali Date Picker
jalaliDatepicker.startWatch({
  dateFormat: "YYYY/MM/DD",
});

// ================== Gender Select Dropdown ================== //
$("#gender").select2({
  minimumResultsForSearch: Infinity,
  placeholder: "انتخاب کنید",
  width: "style",
});

$("#gender").on("select2:select", function (e) {
  // Trigger form validation update when gender is selected
  window.formStateManager.updateButtonState();
});

// ================== Select2 Province-City Manager ================== //
// When API is ready, update endpoints and replace mock data
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
      placeholder: "انتخاب کنید",
    });

    // Initialize city select (initially disabled)
    $(this.selectors.city).select2({
      ...commonConfig,
      placeholder: "انتخاب کنید",
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

      // Update form validation state
      if (window.formStateManager) {
        window.formStateManager.updateButtonState();
      }
    } catch (error) {
      console.error("Error loading cities:", error);
      this.handleCityLoadError(provinceId);
    }
  }

  // Load cities (currently using mock data)
  async loadCities(provinceId) {
    // Simulate API delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // ========== MOCK DATA (REMOVE WHEN API READY) ========== //
    if (this.mockData[provinceId]) {
      return this.mockData[provinceId];
    }

    console.warn(`No cities found for province ID: ${provinceId}`);
    return [];
  }

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

    // Update form validation state when city is selected
    if (window.formStateManager) {
      window.formStateManager.updateButtonState();
    }

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

// ================== Form State Manager and button state management ================== //
// Monitors form fields in real-time and updates submit button accordingly
class FormStateManager {
  constructor() {
    // selectors
    this.formId = "#user-info__form";
    this.submitBtnId = "#user-info__submit-btn";

    this.requiredFields = [
      "#first-name",
      "#last-name",
      "#email",
      "#phone",
      "#date",
      "#gender",
      "#province-select",
      "#city-select",
    ];

    this.validator = null; // Will hold JustValidate instance
    this.init();
  }

  // Initialize form validation and state management
  init() {
    this.initializeValidation();
    this.bindRealTimeValidation();
    this.updateButtonState();
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

    // Validation Rules
    this.validator
      .addField(
        "#first-name",
        [
          {
            rule: "required",
            errorMessage: "نام الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#first-name")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#last-name",
        [
          {
            rule: "required",
            errorMessage: "نام خانوادگی الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#last-name")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#email",
        [
          {
            rule: "required",
            errorMessage: "ایمیل الزامی است",
          },
          {
            rule: "email",
            errorMessage: "ایمیل معتبر وارد کنید",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#email")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#phone",
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
            .querySelector("#phone")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#date",
        [
          {
            rule: "required",
            errorMessage: "تاریخ تولد الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#date")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#gender",
        [
          {
            rule: "required",
            errorMessage: "انتخاب جنسیت الزامی است",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#gender")
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
      .onSuccess(() => {
        this.handleFormSubmission();
      })
      .onFail(() => {
        this.updateButtonState();
      });
  }

  // This ensures button state updates immediately when fields change
  bindRealTimeValidation() {
    this.requiredFields.forEach((field) => {
      $(document).on("input change", field, () => {
        this.updateButtonState();
      });
    });

    $(document).on(
      "change",
      ".select2-province, .select2-city, #gender",
      () => {
        this.updateButtonState();
      }
    );

    // Handle date picker changes
    $(document).on("change", "#date", () => {
      this.updateButtonState();
    });
  }

  
  // Update submit button state based on form validity
  
  updateButtonState() {
    const submitBtn = document.querySelector(this.submitBtnId);
    const isFormValid = this.isFormValid();

    if (submitBtn) {
      if (isFormValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("button--disabled");
        submitBtn.classList.add("button--primary");
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.add("button--disabled");
        submitBtn.classList.remove("button--primary");
      }
    }
  }

  // Check if all form fields are valid
  isFormValid() {
    return this.requiredFields.every((field) => {
      const element = document.querySelector(field);
      if (!element) return false;

      if (element.type === "select-one") {
        return element.value !== "";
      }

      const hasValue = element.value.trim() !== "";
      const isValid = !element.classList.contains("is-invalid");

      return hasValue && isValid;
    });
  }

  // Handle form submission when validation passes
  handleFormSubmission() {
    const submitBtn = document.querySelector(this.submitBtnId);

    submitBtn.disabled = true;
    submitBtn.classList.remove("button--disabled", "button--primary");
    submitBtn.classList.add("button--loading");

    const buttonText = submitBtn.querySelector(".button__text");
    if (buttonText) {
      buttonText.textContent = "در حال ثبت...";
      toastr.success("اطلاعات شما با موفقیت تغییر کرد.", "تغییرات انجام شد");
    }

    console.log("Form validation passed, submitting form...");

  }
}

// ================== Password Change Manager ================== //
class PasswordChangeManager {
  constructor() {
    this.formId = "#user-info__password-change-form";
    this.submitBtnId = "#password-change-submit-btn";
    this.validator = null;

    this.init();
  }

  init() {
    this.initializeValidation();
    this.bindRealTimeValidation();
    this.updateButtonState();
  }

  // Initialize password change form validation
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
      validateOnBlur: true,
      focusInvalidField: true,
      lockForm: false,
    };

    this.validator = new JustValidate(this.formId, validateOptions);

    this.validator
      .addField(
        "#current-password",
        [
          {
            rule: "required",
            errorMessage: "رمز عبور فعلی الزامی است",
          },
          {
            rule: "minLength",
            value: 6,
            errorMessage: "رمز عبور باید حداقل ۶ کاراکتر باشد",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#current-password")
            .closest(".input__with-error-wrapper"),
        }
      )
      .addField(
        "#new-password",
        [
          {
            rule: "required",
            errorMessage: "رمز عبور جدید الزامی است",
          },
          {
            rule: "minLength",
            value: 6,
            errorMessage: "رمز عبور باید حداقل ۶ کاراکتر باشد",
          },
          {
            rule: "customRegexp",
            value: /[?@#%&*^$!]/,
            errorMessage: "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد",
          },
          {
            rule: "customRegexp",
            value: /[a-zA-Z]/,
            errorMessage: "رمز عبور باید حداقل یک حرف انگلیسی داشته باشد",
          },
        ],
        {
          errorsContainer: document
            .querySelector("#new-password")
            .closest(".input__with-error-wrapper"),
        }
      )
      .onSuccess(() => {
        this.handlePasswordChangeSubmission();
      })
      .onFail(() => {
        this.updateButtonState();
      });
  }

  // Bind real-time validation for password fields
  bindRealTimeValidation() {
    $(document).on("input", "#current-password, #new-password", () => {
      this.updateButtonState();
    });
  }

  // Update password change button state
  updateButtonState() {
    const submitBtn = document.querySelector(this.submitBtnId);
    const isFormValid = this.isFormValid();

    if (submitBtn) {
      if (isFormValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("button--disabled");
        submitBtn.classList.add("button--primary");
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.add("button--disabled");
        submitBtn.classList.remove("button--primary");
      }
    }
  }

  // Check if password form is valid
  isFormValid() {
    const currentPassword = document.querySelector("#current-password");
    const newPassword = document.querySelector("#new-password");

    const isCurrentPasswordValid =
      currentPassword &&
      currentPassword.value.trim() !== "" &&
      !currentPassword.classList.contains("is-invalid");

    const isNewPasswordValid =
      newPassword &&
      newPassword.value.trim() !== "" &&
      !newPassword.classList.contains("is-invalid");

    return isCurrentPasswordValid && isNewPasswordValid;
  }

  // Handle password change form submission
  handlePasswordChangeSubmission() {
    const submitBtn = document.querySelector(this.submitBtnId);

    submitBtn.disabled = true;
    submitBtn.classList.remove("button--disabled", "button--primary");
    submitBtn.classList.add("button--loading");

    const buttonText = submitBtn.querySelector(".button__text");
    if (buttonText) {
      buttonText.textContent = "در حال تغییر...";
      toastr.success(
        "رمز عبور جدید شما با موفقیت جایگزین شد.",
        "رمز عبور تغییر کرد."
      );
    }

    console.log("Password change form validated, ready for API submission");
    // document.querySelector(this.formId).submit();
  }
}

// ================== Password Toggle Manager ================== //
class PasswordToggleManager {
  constructor() {
    this.selectors = {
      currentPasswordToggle: "#current-password-toggle",
      currentPasswordField: "#current-password",
      newPasswordToggle: "#new-password-toggle",
      newPasswordField: "#new-password",
    };

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $(this.selectors.currentPasswordToggle).on("click", (e) => {
      this.togglePasswordVisibility(
        this.selectors.currentPasswordField,
        this.selectors.currentPasswordToggle
      );
    });

    $(this.selectors.newPasswordToggle).on("click", (e) => {
      this.togglePasswordVisibility(
        this.selectors.newPasswordField,
        this.selectors.newPasswordToggle
      );
    });
  }

  // Toggle password visibility between text and password types
  togglePasswordVisibility(fieldSelector, toggleSelector) {
    const $field = $(fieldSelector);
    const $toggle = $(toggleSelector);
    const $icon = $toggle.find("use");

    if ($field.attr("type") === "password") {
      $field.attr("type", "text");
      $icon.attr("href", "assets/icons/sprites.svg#vuesax/bold/eye");
    } else {
      $field.attr("type", "password");
      $icon.attr("href", "assets/icons/sprites.svg#vuesax/bulk/eye-slash");
    }
  }
}

// ================== profile img modal start ================== //
// modal
const showButton = document.querySelector("#upload-profile-img");

showButton.onclick = () => {
  const profileImgModal = new bootstrap.Modal(
    document.querySelector("#profile-img-modal")
  );
  profileImgModal.show();
};

// Image upload
document.addEventListener('DOMContentLoaded', function () {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const previewImage = document.getElementById('previewImage');
  const form = document.getElementById('form-profile-image');
  const userIcon = document.querySelector('.user-icon');
  const uploadText = document.querySelector('.upload-text');

  // reset upload area
  function resetUploadArea() {
    form.reset();
    previewImage.style.display = 'none';
    previewImage.src = '';
    uploadArea.classList.remove('active');

    if (userIcon) userIcon.style.display = 'block';
    if (uploadText) uploadText.style.display = 'block';
  }

  uploadArea.addEventListener('click', function () {
    fileInput.click();
  });

  fileInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
      const file = this.files[0];

      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        uploadArea.classList.add('active');

        if (userIcon) userIcon.style.display = 'none';
        if (uploadText) uploadText.style.display = 'none';
      }
      reader.readAsDataURL(file);
    }
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadArea.classList.add('active');
  });

  uploadArea.addEventListener('dragleave', function () {
    if (!fileInput.files.length) {
      uploadArea.classList.remove('active');
    }
  });

  uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
    }
  });

  // Reset when modal is hidden
  const modalElement = document.getElementById('profile-img-modal');
  modalElement.addEventListener('hidden.bs.modal', function () {
    resetUploadArea();
  });
});

const profileImageValidator = new JustValidate("#form-profile-image", {
  errorFieldCssClass: "border-error",
  errorLabelStyle: {
    color: "var(--Color-Text-icon-on-subtle-error)",
    font: "var(--Font-Caption-bold-style)",
    marginTop: "var(--Spacing-sm)",
    display: "block",
  },
  submitFormAutomatically: false,
});

profileImageValidator
  .addField(
    "#fileInput",
    [
      {
        rule: "required",
        errorMessage: "انتخاب تصویر الزامی است.",
      },
      {
        rule: "minFilesCount",
        value: 1,
        errorMessage: "لطفاً یک تصویر انتخاب کنید.",
      },
      {
        rule: "maxFilesCount",
        value: 1,
        errorMessage: "فقط یک تصویر مجاز است.",
      },
      {
        rule: "files",
        value: {
          files: {
            types: ['image/jpeg', 'image/png'],
            maxSize: 50 * 1024 * 1024, // 50MB
            minSize: 1024, // 1KB minimum
          },
        },
        errorMessage: "فایل باید کمتر از 50MB و از نوع JPEG یا PNG باشد.",
      }
    ],
    {
      errorsContainer: document.querySelector("#fileInput").closest(".upload-container"),
    }
  )
  .onSuccess((event) => {
    toastr.success("تصویر پروفایل با موفقیت به‌روزرسانی شد.", "آپلود انجام شد");
    toastr.warning("تصویر پروفایل بدون تغییر باقی ماند", "خطا در آپلود");

    event.preventDefault();

    // close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('profile-img-modal'));
    modal.hide();
  });

// ================== profile img modal end ================== //

// ================== Initialize All Managers ================== //
$(document).ready(function () {
  window.provinceCityManager = new ProvinceCityManager();
  window.formStateManager = new FormStateManager();
  window.passwordChangeManager = new PasswordChangeManager();
  window.passwordToggleManager = new PasswordToggleManager();
  console.log("All form managers initialized successfully");
  console.log(
    "Available managers: provinceCityManager, formStateManager, passwordChangeManager, passwordToggleManager"
  );
});
