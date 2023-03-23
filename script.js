const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.borderRadius = '5px'; // Change border radius on hover
  });

  link.addEventListener('mouseout', () => {
    link.style.borderRadius = ''; // Reset border radius on mouseout
  });
});