if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")
const axios = require('axios');
// const _get = require('lodash/get');
const removeMarkdown = require('remove-markdown');
const apiBase = process.env.REACT_APP_API_URL;
const frontendBaseUrl = process.env.REACT_APP_FRONTEND_URL;
const hounslowConnectLogoUrl = `${frontendBaseUrl}/hounslow-logo-white.png`

const wrap = fn => (...args) => fn(...args).catch(args[2])
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")

const removeMarkdownConfig = {
  useImgAltText: true
}

const iterable = (item) => {
  return item && typeof item === 'object' && (Array.isArray(item) || item.constructor === Object);
}

const _get = (data, path, defaultValue) => {
  if (iterable(data)) {
    const steps = path.split('.');
    const entry = steps[steps.length - 1];
    let node = data;
    for (let i in steps) {
      const step = steps[i]
      if (i == steps.length - 1) {
        return node[step];
      }
      if (!iterable(node[step])) {
        return defaultValue;
      }
      node = node[step]
    };
  }
  return defaultValue;
}

const getUrlParameter = (name) => {
  if (! envUris.querystring) {
    return null;
  }
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(envUris.querystring);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const fetchService = async (name = null) => {
  try {
    let response = await axios.get(`${apiBase}/services/${name.trim()}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const fetchOrganisation = async (name = null) => {
  try {
    let response = await axios.get(`${apiBase}/organisations/${name.trim()}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const fetchCategory = async (id = null) => {
  try {
    let response = await axios.get(`${apiBase}/collections/categories/${id}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const fetchPersona = async (id = null) => {
  try {
    let response = await axios.get(`${apiBase}/collections/personas/${id}`)
    return _get(response, 'data.data');
  } catch (err) {
    return false
  }
};

const fetchCMSData = async () => {
  try {
    let response = await axios.get(`${apiBase}/settings`)
    return _get(response, 'data.data.cms');
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

    const metaTitle = _get(data, 'name', '')
    const serviceHasLogo = _get(data, 'has_logo', false)
    const orgHasLogo = _get(data, 'organisation.has_logo', false)
    const orgImageUrl = `${apiBase}/organisations/${data.organisation_id}/logo.png?v=${data.organisation_id}`

    let rawPageContent = _get(data, 'intro', '')

    // strip markdown formatting
    rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

    // limit to 160 chars
    let metaDesc = rawPageContent.substring(0, 161)

    if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

    if(data) {
      let metas = [
        { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
        { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
        { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` },
        { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
        { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}/${data.slug}` },
        { name: '__PAGE_META_OG_IMAGE__', content: (serviceHasLogo ? `${apiBase}/services/${data.id}/logo.png?` : (orgHasLogo ? orgImageUrl : hounslowConnectLogoUrl)) }
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

    const metaTitle = _get(data, 'name', '')
    const orgHasLogo = _get(data, 'has_logo', false)
    const orgImageUrl = `${apiBase}/organisations/${data.id}/logo.png?v=${data.id}`

    let rawPageContent = _get(data, 'description', '')

    // strip markdown formatting
    rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

    // limit to 160 chars
    let metaDesc = rawPageContent.substring(0, 161)

    if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

    if(data) {
      let metas = [
        { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
        { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
        { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` },
        { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc },
        { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}/${data.slug}` },
        { name: '__PAGE_META_OG_IMAGE__', content: (orgHasLogo ? orgImageUrl : hounslowConnectLogoUrl) }
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
app.get("/", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()

  const metaTitle = _get(cmsData, 'frontend.home.banners.0.title', '')
  let rawPageContent = _get(cmsData, 'frontend.home.banners.0.content', '')

  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161)

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc }, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Search results
app.get("/results", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  const hasCategoryParam = !!req.query.category
  let updatedPage = raw.toString()
  let metaTitle = 'Results | Hounslow Connect'
  let metaDesc = 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow'
  let rawPageContent = ''

  console.log('Request:', req);

  if (req.query.category) {
    const categoryData = await fetchCategory(req.query.category)

    rawPageContent = _get(categoryData, 'intro', '')

    // strip markdown formatting
    rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

    // limit to 160 chars
    metaDesc = rawPageContent.substring(0, 161)
    metaTitle = _get(categoryData, 'name', '').concat(' in Hounslow')
  }

  if (req.query.persona) {
    const personaData = await fetchPersona(req.query.persona)

    let rawPageContent = _get(personaData, 'intro', '')

    // strip markdown formatting
    rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

    // limit to 160 chars
    metaDesc = rawPageContent.substring(0, 161)
    metaTitle = _get(personaData, 'name', '').concat(' in Hounslow')
  }

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: metaTitle },
    { name: '__PAGE_META_DESCRIPTION__', content: metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc }, { name: '__PAGE_META_OG_TITLE__', content: metaTitle }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Favourites
app.get("/favourites", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.favourites.title', '')
  let rawPageContent = _get(cmsData, 'frontend.favourites.content', '')

  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161)

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc }, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Referral
app.get("/referral", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  let metas = [
    { name: '__PAGE_TITLE__', content: 'Referral | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' }, { name: '__PAGE_META_OG_TITLE__', content: 'Referral | Hounslow Connect' }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
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
app.get("/about", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.about.title', '')
  let rawPageContent = _get(cmsData, 'frontend.about.content', '')

  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161)

  if (rawPageContent.length >= 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc }, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Contact
app.get("/contact", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.contact.title', '')
  let rawPageContent = _get(cmsData, 'frontend.contact.content', '')

  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161)

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc}, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Get involved
app.get("/get-involved", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.get_involved.title', '')
  let rawPageContent = _get(cmsData, 'frontend.get_involved.content', '')

  // strip markdown formatting
  rawPageContent = removeMarkdown(rawPageContent, removeMarkdownConfig)

  // limit to 160 chars
  let metaDesc = rawPageContent.substring(0, 161)

  if (rawPageContent.length > 160) metaDesc = metaDesc.concat('...')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  metaDesc },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: metaDesc }, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Privacy policy
app.get("/privacy-policy", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.privacy_policy.title', '')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  'We are committed to protecting and respecting your privacy' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'We are committed to protecting and respecting your privacy' },
    { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

// Terms and Conditions
app.get("/terms-and-conditions", wrap(async (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  let updatedPage = raw.toString()

  const cmsData = await fetchCMSData()
  const metaTitle = _get(cmsData, 'frontend.terms_and_conditions.title', '')

  let metas = [
    { name: '__PAGE_TITLE__', content: `${metaTitle} | Hounslow Connect` },
    { name: '__PAGE_META_DESCRIPTION__', content:  'This page (together with the documents referred to on it) outlines the terms and conditions on which we and our partners offer services to you' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'This page (together with the documents referred to on it) outlines the terms and conditions on which we and our partners offer services to you' }, { name: '__PAGE_META_OG_TITLE__', content: `${metaTitle} | Hounslow Connect` }, { name: '__PAGE_META_OG_URL__', content: `${frontendBaseUrl}${req.originalUrl}` }, { name: '__PAGE_META_OG_IMAGE__', content: hounslowConnectLogoUrl }
  ]

  metas.forEach(meta => {
    if(meta.content !== '') {
      updatedPage = updatedPage.replace(String(meta.name), `${meta.content}`)
      return
    }
    updatedPage = updatedPage.replace(String(meta.name), '')
  })

  res.send(updatedPage)
}))

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
