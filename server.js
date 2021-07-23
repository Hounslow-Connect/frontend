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
const frontendBaseUrl = process.env.REACT_APP_FRONTEND_URL;

const wrap = fn => (...args) => fn(...args).catch(args[2])
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")

const fetchService = async (name) => {
  try {
    let response = await axios.get(`${apiBase}/services/${name.trim()}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const fetchOrganisation = async (name) => {
  try {
    let response = await axios.get(`${apiBase}/organisations/${name.trim()}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};


// Service page
app.get('/services/:slug', wrap(async (req, res) => {
  if (!req.params.slug) {
    throw new BadRequestError('Missing slug')
  }

  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let slug = req.params.slug

  if(slug && slug !== '') {
    slug = slug.trim()

    const data = await fetchService(slug)

    if(data) {
      let metas = [
        { name: '__PAGE_TITLE__', content: `${data.name} | Hounslow Connect` }, 
        { name: '__PAGE_META_DESCRIPTION__', content:  `${data.intro}` },
        { name: '__PAGE_META_OG_TITLE__', content: `${data.name}` },   
        { name: '__PAGE_META_OG_DESCRIPTION__', content: `${data.intro}` },   
        { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}/${data.slug}` },   
        { name: '__PAGE_META_OG_IMAGE__', content: (data.has_logo ? `${apiBase}/services/${data.id}/logo.png?` : `${apiBase}/organisations/${data.organisation_id}/logo.png?v=${data.organisation_id}`) }   
      ]

      metas.forEach(meta => {
        if(meta.content !== '') {
          updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
          return
        }
        updatedPage = updatedPage.replace(String(meta.name), '')
      })
    }
  }

  res.send(updatedPage)
}))

// Organisations page
app.get('/organisations/:slug', wrap(async (req, res) => {
  if (!req.params.slug) {
    throw new BadRequestError('Missing slug')
  }

  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let slug = req.params.slug

  if(slug && slug !== '') {
    slug = slug.trim()

    const data = await fetchOrganisation(slug)

    if(data) {
      let metas = [
        { name: '__PAGE_TITLE__', content: `${data.name} | Hounslow Connect` }, 
        { name: '__PAGE_META_DESCRIPTION__', content:  `${data.description}` },
        { name: '__PAGE_META_OG_TITLE__', content: `${data.name}` },   
        { name: '__PAGE_META_OG_DESCRIPTION__', content: `${data.description}` },   
        { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}/${data.slug}` },   
        { name: '__PAGE_META_OG_IMAGE__', content: (data.has_logo ? `${apiBase}/organisations/${data.id}/logo.png?v=${data.id}` : '') }   
      ]

      metas.forEach(meta => {
        if(meta.content !== '') {
          updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
          return
        }
        updatedPage = updatedPage.replace(String(meta.name), '')
      })
    }
  }

  res.send(updatedPage)
}))

// Home page
app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Home | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Home | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Search results
app.get("/results", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Results | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Results | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Favourites
app.get("/favourites", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Favourites | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Favourites | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Referral
app.get("/referral", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Referral | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Referral | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// About
app.get("/about", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'About | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'About | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Contact
app.get("/contact", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Contact | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Contact | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Get involved
app.get("/get-involved", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Get involved | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Get involved | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Privacy policy
app.get("/privacy-policy", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Privacy policy | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Privacy policy | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Terms and Conditions
app.get("/terms-and-conditions", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Terms and Conditions | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Terms and Conditions | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})

// Duty to refer
app.get("/duty-to-refer", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Duty to refer | Hounslow Connect' }, 
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Duty to refer | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: '' }   
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
})


app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
)

const port = process.env.PORT || 80
app.listen(port)
/* tslint:enable */