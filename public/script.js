const fileInput = document.getElementById("formFile");

const uploadFile = async () => {
  const filesList = fileInput.files;

  const formData = new FormData();
  formData.append("files", filesList[0]);
  formData.append("files", filesList[1]);

  const response = await fetch("http://localhost:3000/cloudUpload",{
    method: "POST",
    body: formData,
  });
  
  const data = await response.json();
  console.log(data);
};
