document.addEventListener("DOMContentLoaded", () => {
    const nickname = prompt("Enter your nickname:");
    localStorage.setItem("nickname", nickname);
    document.getElementById("nickname-display").innerText = `Nickname: ${nickname}`;
  
    // Initialize the presentation
    const presentation = new Presentation();
  
    // Add Slide Button
    document.getElementById("add-slide").addEventListener("click", () => {
      presentation.addSlide();
      presentation.renderSlides();
    });
  
    // Add Text Block Button
    document.getElementById("add-text").addEventListener("click", () => {
      const slideContent = document.getElementById("slide-content");
      presentation.addTextBlock(slideContent);
    });
  
    // Render initial slides and users
    presentation.renderSlides();
    presentation.renderUsers();
  });
  