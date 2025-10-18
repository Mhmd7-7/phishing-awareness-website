        // تبديل الوضع الداكن
        function toggleDarkMode() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            
            // تحديث الأيقونة
            const themeIcon = document.querySelector('.theme-toggle i');
            if (isDark) {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }

        // تبديل اللغة
        function toggleLanguage() {
            const isArabic = document.documentElement.dir === 'rtl';
            document.documentElement.dir = isArabic ? 'ltr' : 'rtl';
            document.documentElement.lang = isArabic ? 'en' : 'ar';
            
            // إعادة تحميل السؤال الحالي للاختبار
            loadQuestion();
        }

        // التنقل بين الأقسام
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // إزالة النشاط من جميع الألسنة
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                // إخفاء جميع الأقسام
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                
                // تفعيل اللسان المحدد
                tab.classList.add('active');
                // إظهار القسم المحدد
                const target = tab.getAttribute('data-target');
                document.getElementById(target).classList.add('active');
            });
        });

        // اختبار المعرفة
        const questions = [
            {
                question: {
                    ar: "تحتوي رسالة البريد الإلكتروني على رابط يبدو أنه من بنكك. ماذا يجب أن تفعل أولاً؟",
                    en: "An email contains a link that appears to be from your bank. What should you do first?"
                },
                options: [
                    { 
                        ar: "النقر على الرابط لتسجيل الدخول", 
                        en: "Click the link to log in" 
                    },
                    { 
                        ar: "تمرير الماوس فوق الرابط لرؤية عنوان URL الفعلي", 
                        en: "Hover over the link to see the actual URL" 
                    },
                    { 
                        ar: "إعادة توجيه الرسالة إلى زملائك", 
                        en: "Forward the message to your colleagues" 
                    },
                    { 
                        ar: "حذف الرسالة دون فتحها", 
                        en: "Delete the message without opening it" 
                    }
                ],
                correct: 1
            },
            {
                question: {
                    ar: "أي من العبارات التالية تعتبر علامة خطر في رسالة بريد إلكتروني؟",
                    en: "Which of the following is a red flag in an email message?"
                },
                options: [
                    { 
                        ar: "تحتوي على اسمك الشخصي", 
                        en: "It contains your personal name" 
                    },
                    { 
                        ar: "تطلب تحديث معلومات حسابك بسبب مشكلة تقنية", 
                        en: "It requests updating your account information due to a technical issue" 
                    },
                    { 
                        ar: "تأتي من عنوان بريد إلكتروني رسمي", 
                        en: "It comes from an official email address" 
                    },
                    { 
                        ar: "تحتوي على شعار المؤسسة", 
                        en: "It contains the organization's logo" 
                    }
                ],
                correct: 1
            }
        ];
        
        let currentQuestion = 0;
        
        function loadQuestion() {
            const q = questions[currentQuestion];
            const isArabic = document.documentElement.dir === 'rtl';
            
            document.getElementById('question').querySelector('.lang-ar').textContent = q.question.ar;
            document.getElementById('question').querySelector('.lang-en').textContent = q.question.en;
            
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';
            
            q.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'quiz-option';
                optionElement.setAttribute('data-correct', index === q.correct ? 'true' : 'false');
                
                const arSpan = document.createElement('span');
                arSpan.className = 'lang-ar';
                arSpan.textContent = option.ar;
                
                const enSpan = document.createElement('span');
                enSpan.className = 'lang-en';
                enSpan.textContent = option.en;
                
                optionElement.appendChild(arSpan);
                optionElement.appendChild(enSpan);
                optionElement.addEventListener('click', selectOption);
                optionsContainer.appendChild(optionElement);
            });
            
            document.getElementById('result').style.display = 'none';
            document.getElementById('next-question').style.display = 'none';
        }
        
        function selectOption() {
            document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        }
        
        document.getElementById('submit-answer').addEventListener('click', () => {
            const selectedOption = document.querySelector('.quiz-option.selected');
            const isArabic = document.documentElement.dir === 'rtl';
            
            if (!selectedOption) {
                alert(isArabic ? 'يرجى اختيار إجابة أولاً' : 'Please select an answer first');
                return;
            }
            
            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            const resultElement = document.getElementById('result');
            
            if (isCorrect) {
                resultElement.innerHTML = isArabic ? 
                    '<span class="lang-ar">إجابة صحيحة! أحسنت.</span><span class="lang-en" style="display:none">Correct answer! Well done.</span>' : 
                    '<span class="lang-ar" style="display:none">إجابة صحيحة! أحسنت.</span><span class="lang-en">Correct answer! Well done.</span>';
                resultElement.className = 'quiz-result correct';
            } else {
                resultElement.innerHTML = isArabic ? 
                    '<span class="lang-ar">إجابة خاطئة. حاول مرة أخرى.</span><span class="lang-en" style="display:none">Incorrect answer. Try again.</span>' : 
                    '<span class="lang-ar" style="display:none">إجابة خاطئة. حاول مرة أخرى.</span><span class="lang-en">Incorrect answer. Try again.</span>';
                resultElement.className = 'quiz-result incorrect';
            }
            
            resultElement.style.display = 'block';
            document.getElementById('next-question').style.display = 'inline-flex';
        });
        
        document.getElementById('next-question').addEventListener('click', () => {
            currentQuestion = (currentQuestion + 1) % questions.length;
            loadQuestion();
        });
        
        // إضافة مستمعي الأحداث
        document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
        document.getElementById('langToggle').addEventListener('click', toggleLanguage);
        
        // تحميل السؤال الأول عند فتح الصفحة
        loadQuestion();