window.onload = async () => {
    await loadMemos()
}

async function loadMemos() {
    const res = await fetch('/memos')
    const data = await res.json()
    if (res.ok) {
        let html = ''
        let index = 0
        for (memo of data ) {
            html += `<div class="memo-container" >
            <input class="message-input" type="text" value="${memo.msg}"/>
            <div class="image-container">
                <img src="http://localhost:8080/uploads/${memo.filename}" alt="Image"/>
            </div>
            <div class="delete-btn" data_index="${index}">
                <i class="fa-solid fa-trash" data_index="${index}"></i>
            </div>
            <div class="edit-btn" data_index="${index}">
                <i class="fa-solid fa-pen-to-square" data_index="${index}"></i>
            </div>
        </div>`
        index ++ 
        }
        const rightContainer = document.querySelector('.right-container')
        rightContainer.innerHTML = html

        // add event listener
        const memoContainer = document.querySelectorAll('.memo-container')
        for (index in memoContainer ) {
            const memoDiv = memoContainer[index]
            const editBtn = memoDiv.querySelector('.edit-btn')
            const deleteBtn = memoDiv.querySelector('.delete-btn')


            editBtn.addEventListener('click', async (e) => {
                const element = e.target
                const data_index = element.getAttribute('data_index')
                const messageInput = memoDiv.querySelector('.message-input').value
                // Call Edit API
                const res = await fetch('/memos', {
                    method: "PUT",
                    body: JSON.stringify({
                        text: messageInput,
                        index: data_index
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                })

                if (res.ok) {
                    loadMemos()
                }
            })

            deleteBtn.addEventListener('click', async (e) => {
                // Call Delete API
                const element = e.target
                const data_index = element.getAttribute('data_index')
                const res = await fetch('/memos', {
                    method: "DELETE",
                    body: JSON.stringify({
                        index: data_index
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res.ok) {
                    loadMemos()
                }
            })
        }
        console.log(memoContainer)
    }
}


const memowallFormElement = document.querySelector("#memo-wall-form")

memowallFormElement.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = e.target
    const content = form.text.value
    const file = form.image.files[0]
    const formData = new FormData()
    formData.append("text", content)
    formData.append("image", file)

    const res = await fetch('/memo-formidable', {
        method: "POST",
        body: formData
    })

    if (res.status === 200 ) {
        loadMemos()
    }
})
login()
async function login() {
    const loginForm = document.querySelector('#login-form')
    console.log(loginForm)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const form  = e.target
        const username = form.username.value
        const password = form.password.value
        const res = await fetch('/login', {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json',   
            }
        })
        if (res.ok) {
            console.log("Login successful")
        }
    })
    
}
