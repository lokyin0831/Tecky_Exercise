const text1 = "12345"
const text2 = "67890"


// const data = jsonfile.readFile(path.join(__dirname, '/public/memos.json'));
// console.log(data)


for (let i = 0; i < 3; i++) {
	memoContainer.innerHTML += `
<div class="memos" id="source">
${text1}
	<div class="white-background-top">
   		<i class="bi bi-trash-fill"></i>
	</div>
	<div class="white-background-bottom">
    	<i class='fas fa-edit'></i>
	</div>
</div>
`;
}

document.querySelector(".input-group")
	.addEventListener("submit", async (e) => {
		e.preventDefault()
		const form = e.target
		const content = form.memoText.value //this is a text

		const formData = new FormData()
		formData.append("text", content)

		const res = await fetch('/index', {
			method: "POST",
			body: formData
		})

		if (res.status === 200) {
			window.location = '/admin.html'
		}
		console.log(res)

	})

