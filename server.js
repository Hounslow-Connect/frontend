const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")
console.log('pathToIndex: ', pathToIndex)
app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const metas = [
    {
			name: '__PAGE_TITLE__',
			content: 'Home | One Hounslow Connect'
    }, 
    {
			name: '__PAGE_META_DESCRIPTION__',
			content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow'
    }   
  ]

  metas.forEach(meta => {
    updatedPage = raw.toString().replace(String(meta.name), `${meta.content}`)
  })

  //   const pageTitle = "Homepage - Welcome to the Homepage"
//   const updated = raw.toString().replace("__PAGE_TITLE__", `${pageTitle}`)
  res.send(updatedPage)
})
//
app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
/* tslint:enable */