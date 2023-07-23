var expcount = 1;
var educount = 1;
const skillSet = new Set();//avoid duplicates
var fileName = "";

function addSkill(){
    if (document.querySelector("#skill-input").value.length == 0){
        alert("Please enter your skill");
    }else{
        var skillValue = document.querySelector("#skill-input").value;
        if(skillSet.has(skillValue)){
            alert("Skill already exists");
            return;
        }
        skillSet.add(skillValue);

        document.querySelector("#skills").innerHTML +=`
        <div class="skill mt-1">
         <span class="skill-name">${skillValue}</span>
         <button class="btn btn-outline-danger delete">  
         <i class="fa-sharp fa-solid fa-trash"></i>
         </button>
         </div>`;
        document.querySelector("#skill-input").value = "";
        var current_tasks = document.querySelectorAll(".delete");
        console.log(typeof current_tasks);
       for (var i = 0; i < current_tasks.length; i++) {
       current_tasks[i].onclick = function () {
       this.parentNode.remove();
      };
    }
    }
}


function previewImage(event){
    console.log("previewImage(event)<<");
    console.log(typeof event);
    var imagePreview =document.getElementById("image-preview");

    if(event.target.files[0]){
        imagePreview.src = URL.createObjectURL(event.target.files[0]);
        imagePreview.style.display= "block";
        imagePreview.onload = function(){
            URL.revokeObjectURL(imagePreview.src);
        }
    }
    console.log("previewImage(event)>>");
    
}


function addworkExperience(){
    console.log("addworkExperience() <<");

    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control","we-field","mt-1");
    newNode.setAttribute("rows",3);
    newNode.setAttribute("id","experience-"+ ++expcount);
    newNode.setAttribute("placeholder","enter your academic qualification-"+ expcount);
    
    let experienceDiv = document.getElementById("experience-div");
    let experienceAddbuttonsDiv = document.getElementById("we-btns-div");
    let we_del_btn = document.getElementById("we-del-btn");
     
    experienceDiv.insertBefore(newNode,experienceAddbuttonsDiv);
    console.log("addworkExperience() >>");
}

function removeworkExperience(){
    console.log("removeworkExperience() <<"+expcount);
    let latestExperience = document.getElementById("experience-"+expcount);
    latestExperience.remove();
    --expcount;
    console.log("removeworkExperience() >>");

}


function addEducation(){
    console.log("addEducation() <<");

    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control","ed-field","mt-1");
    newNode.setAttribute("rows",3);
    newNode.setAttribute("id","education-"+ ++educount);
    newNode.setAttribute("placeholder","enter your work experience-"+ educount);
    
    let educationDiv = document.getElementById("education-div");
    let educationAddbuttonsDiv = document.getElementById("ed-btns-div");
    let ed_del_btn = document.getElementById("ed-del-btn");
     
    educationDiv.insertBefore(newNode,educationAddbuttonsDiv);
    console.log("addEducation() >>");
}
 

function removeEducation(){
    console.log("removeEducation() <<"+educount);
    let latestExperience = document.getElementById("education-"+educount);
    latestExperience.remove();
    --educount;
    console.log("removeworkExperience() >>");

}
  
function startOver(){
    console.log("startOver() <<");
    window.location.reload();
    console.log("startOver() >>");

}

function generateResume(){
    console.log("generateResume() <<");
    let fullName = document.getElementById("full-name").value;
    let fullNameTemplate = document.getElementById("full-nametemplate");
    fullNameTemplate.innerHTML = fullName;

    let dob = document.getElementById("dob").value;
    let dobTemplate = document.getElementById("dob-template");
    dobTemplate.innerHTML = dob;

    let address = document.getElementById("address").value;
    let addressTemplate = document.getElementById("address-template");
    addressTemplate.innerHTML = address;

    let email = document.getElementById("email").value;
    let emailTemplate = document.getElementById("email-template");
    emailTemplate.innerHTML = email;

    let phno = document.getElementById("phno").value;
    let phnoTemplate = document.getElementById("phno-template");
    phnoTemplate.innerHTML = phno;

    let linkedin = document.getElementById("Linkedin").value;
    let linkedinTemplate = document.getElementById("Linkedin-template");
    linkedinTemplate.innerHTML = linkedin;

    let github = document.getElementById("github").value;
    let githubTemplate = document.getElementById("Github-template");
    githubTemplate.innerHTML = linkedin;

    let objective = document.getElementById("objective").value;
    let objectiveTemplate = document.getElementById("objective-template");
    objectiveTemplate.innerHTML = objective;

    let skillSetString = "";
    for (let skill of skillSet){
     skillSetString += ` <span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>`;
    }
    let skilltemplate = document.getElementById("skill-template-div");
    skilltemplate.innerHTML = skillSetString;


    let experiences = document.getElementsByClassName("we-field");
    let experienceListString = "";
    for (let experience of experiences){
        experienceListString += `<li>${experience.value}</li>`;
    }
    let experiencestemplate = document.getElementById("we-template");
    experiencestemplate.innerHTML = experienceListString;


    let academicQualification = document.getElementsByClassName("ed-field");
    let academicQualificationString = "";
    for (let qualification of academicQualification){
        academicQualificationString += `<li>${qualification.value}</li>`;
    }
    let edtemplate = document.getElementById("ed-template");
    edtemplate.innerHTML = academicQualificationString;

    let file = document.getElementById("profile-img").files[0];
    if(file == undefined){
        console.log("file not selected");
    }else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            document.getElementById("profile-img-template").src = reader.result;
        };
    }
    
    document.getElementById("resume-template").style.display = "block";
    document.getElementById("save-btn").style.display = "block";
    document.getElementById("resume-form").style.display = "none";
    console.log("generateResume() >>");
}


function printResume(templateID){
    console.log("printResume() <<");
    var printContent = document.getElementById(templateID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    console.log("printResume() >>");
}