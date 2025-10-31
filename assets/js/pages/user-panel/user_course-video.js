import "../../../libs/jquery/jquery-3.7.1.min.js";
import "../../../libs/validate.min.js/just-validate.production.min.js";

// ================== Form State Manager and button state management ================== //
class CommentFormStateManager {
    constructor() {
        // selectors
        this.formId = '#comment-form';
        this.submitBtnId = '#comment-submit-btn';

        // only rating is required
        this.requiredFields = [
            'input[name="rating"]',
        ];

        this.validator = null; // Will hold JustValidate instance
        this.init();
    }

    // Initialize form validation and state management
    init() {
        this.initializeValidation();
        this.bindRealTimeValidation();
        this.updateButtonState();
        this.updateStarDisplay();
    }

    // Initialize JustValidate            
    initializeValidation() {
        const validateOptions = {
            errorFieldCssClass: "is-invalid",
            errorLabelStyle: {
                color: "var(--Color-Text-icon-on-subtle-error)",
                font: "var(--Font-Caption-bold-style)",
                marginTop: "var(--Spacing-sm)",
                display: "block",
            },
            successFieldCssClass: "is-valid",
            validateOnBlur: true, // Validate when field loses focus
            focusInvalidField: true, // Auto-focus first invalid field
            lockForm: false // Don't lock form on validation failure
        };

        this.validator = new JustValidate(this.formId, validateOptions);

        // validation rules for rating (required)
        this.validator
            .addField('input[name="rating"]', [
                {
                    rule: "required",
                    errorMessage: "لطفاً امتیاز خود را انتخاب کنید",
                },
            ], {
                errorsContainer: document.querySelector(".comment-form__score"),
            })
            // validation rules for comment (optional)
            .addField("#comment-text", [
                {
                    rule: "minLength",
                    value: 10,
                    errorMessage: "نظر باید حداقل ۱۰ کاراکتر باشد",
                },
                {
                    rule: "maxLength",
                    value: 500,
                    errorMessage: "نظر نباید بیشتر از ۵۰۰ کاراکتر باشد",
                },
            ], {
                errorsContainer: document.querySelector("#comment-text").closest(".input__with-error-wrapper"),
            })
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
        this.requiredFields.forEach(field => {
            $(document).on('input change', field, () => {
                this.updateButtonState();
            });
        });

        // Also monitor the comment textarea for character count validation
        $(document).on('input', '#comment-text', () => {
            this.updateButtonState();
        });

        // Initialize star rating interactions
        this.initializeStarRating();
    }

    // Initialize star rating functionality
    initializeStarRating() {
        const starInputs = document.querySelectorAll('input[name="rating"]');
        const scoreTitle = document.querySelector('.comments-form__score-title');

        // Add click events to star labels
        document.querySelectorAll('.star-label').forEach((label, index) => {
            label.addEventListener('click', () => {
                const starValue = 5 - index;
                this.updateScoreTitle(starValue);
                this.updateStarDisplay(starValue);
                this.updateButtonState();
            });
        });

        // hover effects for better UX
        document.querySelectorAll('.star-label').forEach((label, index) => {
            const starValue = 5 - index;

            label.addEventListener('mouseenter', () => {
                this.highlightStars(starValue);
            });

            label.addEventListener('mouseleave', () => {
                // Revert to current selection when mouse leaves
                const currentRating = this.getCurrentRating();
                this.updateStarDisplay(currentRating);
            });
        });
    }

    // Get current rating value from form    
    getCurrentRating() {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        return selectedRating ? parseInt(selectedRating.value) : 0;
    }

    // Update the score title text based on rating    
    updateScoreTitle(rating) {
        const scoreTitle = document.querySelector('.comments-form__score-title');
        if (rating === 0) {
            scoreTitle.textContent = '0 ستاره';
        } else {
            scoreTitle.textContent = `${rating} ستاره`;
        }
    }


    // Update visual display of stars based on current rating    
    updateStarDisplay(rating = 0) {
        // Reset all stars to empty
        document.querySelectorAll('.star-label .comments-score__icon svg use').forEach(use => {
            use.setAttribute('href', 'assets/icons/sprites.svg#iconoir:star');
        });

        // Fill stars up to current rating
        for (let i = 1; i <= rating; i++) {
            const starInput = document.getElementById(`star${i}`);
            if (starInput) {
                const useElement = starInput.nextElementSibling.querySelector('.comments-score__icon svg use');
                useElement.setAttribute('href', 'assets/icons/sprites.svg#iconoir:star-solid');
            }
        }
    }


    // Highlight stars on hover
    highlightStars(rating) {
        // Reset all stars to empty
        document.querySelectorAll('.star-label .comments-score__icon svg use').forEach(use => {
            use.setAttribute('href', 'assets/icons/sprites.svg#iconoir:star');
        });

        // Fill stars up to hover rating
        for (let i = 1; i <= rating; i++) {
            const starInput = document.getElementById(`star${i}`);
            if (starInput) {
                const useElement = starInput.nextElementSibling.querySelector('.comments-score__icon svg use');
                useElement.setAttribute('href', 'assets/icons/sprites.svg#iconoir:star-solid');
            }
        }
    }

    // Update submit button state based on form validity
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


    // Check if all form fields are valid
    isFormValid() {
        const ratingValid = this.getCurrentRating() > 0;

        // Check if comment text (if provided) meets length requirements
        const commentElement = document.querySelector('#comment-text');
        const commentText = commentElement ? commentElement.value.trim() : '';
        const commentValid = commentText === '' || (commentText.length >= 10 && commentText.length <= 500);

        return ratingValid && commentValid;
    }


    // Handle form submission when validation passes    
    handleFormSubmission() {
        const submitBtn = document.querySelector(this.submitBtnId);

        // Update button to show loading state
        submitBtn.disabled = true;
        submitBtn.classList.remove("button--disabled");
        submitBtn.classList.add("button--primary");

        // Change button text to indicate processing
        submitBtn.querySelector('.button__text').textContent = 'در حال ارسال...';
        toastr.success("از مشارکت شما سپاسگزاریم", "نظر شما ثبت شد")

        this.processCommentSubmission();
    }


    // Process the comment submission and add to comments section
    processCommentSubmission() {
        const rating = this.getCurrentRating();
        const commentText = document.querySelector('#comment-text').value.trim();

        // Only add to comments section if BOTH rating and comment are provided
        if (rating > 0 && commentText !== '') {
            const newComment = this.createCommentElement(commentText, rating);
            this.addCommentWithAnimation(newComment);
            this.updateCommentsStatistics();
        }
        this.resetForm();
    }

    
    // Create a new comment element
    createCommentElement(text, rating) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment new-comment';

        const now = new Date();
        const dateString = 'همین الان';

        commentDiv.innerHTML = `
                <div class="comment__head">
                    <div class="comment__user">
                        <div class="comment__user-image">
                            <!-- User image would go here -->
                        </div>
                        <div class="comment__user-name">دانشجوی دوره</div>
                    </div>
                    <div class="comment__info">
                        <div class="comment__score">
                            <span class="comments-score__count">${rating}</span>
                            <span class="comments-score__icon">
                                <svg class="icon icon--md" viewBox="0 0 24 24">
                                    <use href="assets/icons/sprites.svg#iconoir:star-solid"></use>
                                </svg>
                            </span>
                        </div>
                        <span class="comments__date">${dateString}</span>
                    </div>
                </div>
                <div class="comment__body">
                    <p>${text}</p>
                </div>
            `;

        return commentDiv;
    }

    
    // Add comment
    addCommentWithAnimation(commentElement) {
        // Add to the top of comments
        const commentsContainer = document.querySelector('.comments');
        commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);

        // Trigger animation after a small delay
        setTimeout(() => {
            commentElement.classList.add('show');
        }, 10);

        // Remove animation class after animation completes
        setTimeout(() => {
            commentElement.classList.remove('new-comment', 'show');
        }, 500);
    }

    
    // Update comments statistics (average rating, total ratings, total comments)
    updateCommentsStatistics() {
        const comments = document.querySelectorAll('.comment');
        let totalRatings = 0;
        let ratingSum = 0;
        let commentCount = 0;

        // Calculate statistics from all comments
        comments.forEach(comment => {
            const ratingElement = comment.querySelector('.comment__score .comments-score__count');
            const commentBody = comment.querySelector('.comment__body p');

            if (ratingElement) {
                const rating = parseInt(ratingElement.textContent);
                totalRatings++;
                ratingSum += rating;

                if (commentBody && commentBody.textContent.trim() !== '') {
                    commentCount++;
                }
            }
        });

        // Update elements
        const averageRating = totalRatings > 0 ? (ratingSum / totalRatings).toFixed(1) : '0.0';
        document.getElementById('average-rating').textContent = averageRating;
        document.getElementById('total-ratings').textContent = `از مجموع ${totalRatings} امتیاز`;
        document.getElementById('total-comments').textContent = `${commentCount} نظر`;
    }


    // Reset form after submission    
    resetForm() {
        // Clear textarea
        document.querySelector('#comment-text').value = '';

        // Reset rating
        this.updateScoreTitle(0);
        this.updateStarDisplay(0);

        // Uncheck all radio buttons
        document.querySelectorAll('input[name="rating"]').forEach(input => {
            input.checked = false;
        });

        // Update button state
        this.updateButtonState();

        // Reset button text
        const submitBtn = document.querySelector(this.submitBtnId);
        submitBtn.querySelector('.button__text').textContent = 'ارسال نظر و امتیاز';
    }
}

// ================== Initialize Manager ================== //
document.addEventListener('DOMContentLoaded', () => {
    window.commentFormStateManager = new CommentFormStateManager();
    window.commentFormStateManager.updateCommentsStatistics();
    console.log('Comment form manager initialized successfully');
})
