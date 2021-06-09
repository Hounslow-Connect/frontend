if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")
const axios = require('axios');
const _get = require('lodash/get');
const apiBase = process.env.REACT_APP_API_URL;

const wrap = fn => (...args) => fn(...args).catch(args[2])
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")
console.log('pathToIndex: ', pathToIndex, ', apiBase: ', apiBase)

const fetchService = async (name) => {
  console.log('dbug 1 [fetchService]: --> name=',name);
  try {
    let response = await axios.get(`${apiBase}/services/${name.trim()}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const getOGImg = async (service) => {
  try {
    if (service.has_logo) {
      let response = await axios.get(`${apiBase}/services/${service.id}/logo.png?`)
      return response;
    } else {
      let response = await axios.get(`${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
        service,
        'organisation.id'
      )}`)
      return response;
    }
  } catch (err) {
    return false
  }

};

// Service page
app.get('/services/:slug', wrap(async (req, res, next) => {
  if (!req.params.slug) {
    throw new BadRequestError('Missing slug')
  }

  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const id = req.params.slug

  if(id && id !== '') {
    const sanitiseId = id.trim()

    // console.log('[Service sanitiseId ---->: ', sanitiseId); //NOTE: returns objcect !!!!

    const data = await fetchService(sanitiseId)

    if(data) {
      const metas = [
        {
          name: '__PAGE_TITLE__',
          content: `${data.name} | One Hounslow Connect`
        }, 
        {
          name: '__PAGE_META_DESCRIPTION__',
          content:  `${data.intro}`
        }   
      ]

      // OG Tags
      let ogTags = []
      ogTags.push({name: 'og:title', content: `${data.name}`})


      // Fetch the image url for the service
      const ogImageUrl = await getOGImg(data)

      console.log('ogImageUrl: ', ogImageUrl);

      // if(data.has_logo) {
      //   ogTags.push({name: 'og:image', content: ''  })
      // }

      

  
      metas.forEach(meta => {
        // console.log('Replace meta: ', meta.name, ', with content: ', meta.content);
        updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      })
    }
  }

  res.send(updatedPage)
}))

// Home page
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

  res.send(updatedPage)
})


app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
/* tslint:enable */