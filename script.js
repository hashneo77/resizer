function compress() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file || !file.type.startsWith('image/')) {
    alert('Please upload a JPG or PNG image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Scale down to 90%
      canvas.width = img.width * 0.9;
      canvas.height = img.height * 0.9;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Compress with quality setting (0.85 ~ 85%)
      canvas.toBlob(function (blob) {
        const link = document.getElementById('downloadLink');
        link.href = URL.createObjectURL(blob);
        link.style.display = 'inline-block';
        link.textContent = 'Download Compressed Image';
      }, 'image/jpeg', 0.85);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}
