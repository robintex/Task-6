class Presentation {
    constructor() {
      this.slides = JSON.parse(localStorage.getItem("slides")) || [];
      this.users = JSON.parse(localStorage.getItem("users")) || [];
      this.currentSlide = 0;
      this.initializeUser();
    }
  
    initializeUser() {
      const nickname = localStorage.getItem("nickname");
      if (!this.users.includes(nickname)) {
        this.users.push(nickname);
        localStorage.setItem("users", JSON.stringify(this.users));
      }
    }
  
    addSlide() {
      const slide = { id: Date.now(), content: [] };
      this.slides.push(slide);
      this.currentSlide = this.slides.length - 1;
      localStorage.setItem("slides", JSON.stringify(this.slides));
    }
  
    addTextBlock(slideContent) {
      const textBlock = document.createElement("div");
      textBlock.contentEditable = true;
      textBlock.className =
        "absolute border border-gray-400 p-2 rounded bg-gray-50 cursor-move";
      textBlock.style.position = "absolute";
      textBlock.style.top = "20px";
      textBlock.style.left = "20px";
      textBlock.innerText = "Editable Text";
      slideContent.appendChild(textBlock);
  
      // Save to current slide
      this.slides[this.currentSlide].content.push({
        type: "text",
        position: { top: 20, left: 20 },
        content: "Editable Text",
      });
      localStorage.setItem("slides", JSON.stringify(this.slides));
    }
  
    renderSlides() {
      const slidesList = document.getElementById("slides-list");
      slidesList.innerHTML = "";
  
      this.slides.forEach((slide, index) => {
        const li = document.createElement("li");
        li.innerText = `Slide ${index + 1}`;
        li.className =
          "cursor-pointer bg-white p-2 rounded shadow hover:bg-gray-100";
        li.addEventListener("click", () => {
          this.currentSlide = index;
          this.renderSlideContent();
        });
        slidesList.appendChild(li);
      });
    }
  
    renderSlideContent() {
      const slideContent = document.getElementById("slide-content");
      slideContent.innerHTML = "";
  
      const currentSlide = this.slides[this.currentSlide];
      currentSlide.content.forEach((block) => {
        if (block.type === "text") {
          const textBlock = document.createElement("div");
          textBlock.contentEditable = true;
          textBlock.className =
            "absolute border border-gray-400 p-2 rounded bg-gray-50";
          textBlock.style.position = "absolute";
          textBlock.style.top = `${block.position.top}px`;
          textBlock.style.left = `${block.position.left}px`;
          textBlock.innerText = block.content;
          slideContent.appendChild(textBlock);
        }
      });
    }
  
    renderUsers() {
      const usersList = document.getElementById("users-list");
      usersList.innerHTML = "";
  
      this.users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user;
        li.className = "p-2 bg-white rounded shadow";
        usersList.appendChild(li);
      });
    }
  }
  