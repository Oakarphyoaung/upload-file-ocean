const fileInput = document.getElementById("formFile");
const fileImgtag = document.getElementsByClassName("imgFile")[0];
const uploadBtn = document.querySelector(".uploadBtn");

const uploadFile = async () => {
  uploadBtn.innerHTML = `
<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
Uploading...
`;
  const filesList = fileInput.files;

  const fileArray = [...filesList];
  const formData = new FormData();

  fileArray.forEach((file) => formData.append("files", file));

  const response = await fetch("http://localhost:3000/cloudUpload", {
    method: "POST",
    body: formData,
  });
  //change bottuon to upload
  uploadBtn.innerHTML = "Upload";

  const data = await response.json();
  console.log(data.data);

  const myFileList = data.data.filter((file) =>
    file.Key.includes("oakar-phyo-aung")
  );

  console.log(myFileList);

  for (let i = 0; i < myFileList.length; i++) {
    const mgSrc = encodeURIComponent(myFileList[i].Key);
    const fileDiv = document.createElement("div");
    fileDiv.innerHTML = `
    <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${mgSrc}" width="200px" class="p-2"/>
    `;
    fileImgtag.append(fileDiv);
  }
};
