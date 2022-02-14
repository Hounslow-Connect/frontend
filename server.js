/**
 * Local test bed for AWS Lambda function deployed in aws/lambda.yml
 * To run the site using this file, use `npm run start:local`
 * This is not identical to the lambda function as the environment is not identical:
 * - The lambda function gets the index.html file from an S3 bucket, while here it is
 * in /build.
 * - The lambda function is run as middleware so passes the updated index.html
 * to the callback, while here it is returned with Express.
 * - The lambda function uses 'https' Node lib, while for local development 'http' is used instead
 */
const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")
const http = require('http');
const dotenv = require("dotenv")

dotenv.config()

// Environment based endpoints
const envUris = {
  apiBase: '',
  frontendBaseUrl: '',
  originalPath: ''
}

const wrap = fn => (...args) => fn(...args).catch(args[2])
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")

/*
* Generate HTTP OK response using 200 status code with HTML body.
*/
const response = {
    status: '200',
    statusDescription: 'OK',
    headers: {
        'cache-control': [{
            key: 'Cache-Control',
            value: 'max-age=100'
        }],
        'content-type': [{
            key: 'Content-Type',
            value: 'text/html'
        }]
    },
    body: null,
};

const pageMeta = {
  "home": [
    { name: '__PAGE_TITLE__', content: 'Home | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Home | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "results": [
    { name: '__PAGE_TITLE__', content: 'Results | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Results | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "favourites": [
    { name: '__PAGE_TITLE__', content: 'Favourites | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Favourites | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "referral": [
    { name: '__PAGE_TITLE__', content: 'Referral | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Referral | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "about": [
    { name: '__PAGE_TITLE__', content: 'About | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'About | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "contact": [
    { name: '__PAGE_TITLE__', content: 'Contact | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Contact | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "get-involved": [
    { name: '__PAGE_TITLE__', content: 'Get involved | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Get involved | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "privacy-policy": [
    { name: '__PAGE_TITLE__', content: 'Privacy policy | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Privacy policy | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalUrl}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "duty-to-refer": [
    { name: '__PAGE_TITLE__', content: 'Duty to refer | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Duty to refer | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalPath}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ],
  "terms-and-conditions": [
    { name: '__PAGE_TITLE__', content: 'Terms and Conditions | Hounslow Connect' },
    { name: '__PAGE_META_DESCRIPTION__', content:  'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_DESCRIPTION__', content: 'Hounslow Connect is a site dedicated to helping people find activities, join clubs, and navigate local services in Hounslow' },
    { name: '__PAGE_META_OG_TITLE__', content: 'Terms and Conditions | Hounslow Connect' },
    { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}${envUris.originalPath}` },
    { name: '__PAGE_META_OG_IMAGE__', content: '' }
  ]
}

const getApi = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NodeHttp'
      }
    };
    http.get(url,options,(res) => {
      let body = "";

      res.on("data", (chunk) => {
          body += chunk;
      });

      res.on("end", () => {
          try {
              let data = JSON.parse(body);
              resolve(data);
          } catch (error) {
              reject(error.message);
          };
      });

    }).on("error", (error) => {
        reject(error.message);
    });
  });
}

const fetchService = async (name) => {
    try {
        const response = await getApi(`${envUris.apiBase}/services/${name.trim()}`)
        return response['data']? response['data'] : null;
    } catch (err) {
      console.log(err);
        return false
    }
};

const fetchOrganisation = async (name) => {
    try {
        const response = await getApi(`${envUris.apiBase}/organisations/${name.trim()}`)
        return response['data']? response['data']['data'] : null;
    } catch (err) {
      console.log(err);
        return false
    }
};

const renderServiceMeta = async (slug) => {
  const data = await fetchService(slug)
  let metas = []

  if(data) {
    metas = [
        { name: '__PAGE_TITLE__', content: `${data.name} | Hounslow Connect` },
        { name: '__PAGE_META_DESCRIPTION__', content:  `${data.intro}` },
        { name: '__PAGE_META_OG_TITLE__', content: `${data.name}` },
        { name: '__PAGE_META_OG_DESCRIPTION__', content: `${data.intro}` },
        { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}/${data.slug}` },
        { name: '__PAGE_META_OG_IMAGE__', content: (data.has_logo ? `${envUris.apiBase}/services/${data.id}/logo.png?` : `${envUris.apiBase}/organisations/${data.organisation_id}/logo.png?v=${data.organisation_id}`) }
    ]
  }

  return metas;
}

const renderOrganisationMeta = async (slug) => {
  const data = await fetchOrganisation(slug)
  let metas = []

  if(data) {
    metas = [
        { name: '__PAGE_TITLE__', content: `${data.name} | Hounslow Connect` },
        { name: '__PAGE_META_DESCRIPTION__', content:  `${data.description}` },
        { name: '__PAGE_META_OG_TITLE__', content: `${data.name}` },
        { name: '__PAGE_META_OG_DESCRIPTION__', content: `${data.description}` },
        { name: '__PAGE_META_OG_URL__', content: `${envUris.frontendBaseUrl}/${data.slug}` },
        { name: '__PAGE_META_OG_IMAGE__', content: (data.has_logo ? `${envUris.apiBase}/organisations/${data.id}/logo.png?v=${data.id}` : '') }
    ]
  }

  return metas;
}

const renderMeta = async () => {
  const urlElements = envUris.originalPath.split('/');
  let meta = [];
  let slug = '';
  switch (urlElements[1]) {
    case 'services':
      if(! urlElements[2] || urlElements[2] === '') {
        throw new Error('Missing slug')
      }
      slug = urlElements[2].trim()
      meta = await renderServiceMeta(slug);
      break;
    case 'organisations':
      if(! urlElements[2] || urlElements[2] === '') {
        throw new Error('Missing slug')
      }
      slug = urlElements[2].trim()
      meta = await renderOrganisationMeta(slug);
      break;
    case 'results':
    case 'favourites':
    case 'referral':
    case 'about':
    case 'contact':
    case 'get-involved':
    case 'privacy-policy':
    case 'duty-to-refer':
    case 'terms-and-conditions':
      meta = pageMeta[urlElements[1]];
      break;
    default:
      meta = pageMeta['home']
  }
  return meta;
}

const renderPage = async () => {
  try {
    const raw = fs.readFileSync(pathToIndex)
    let body = raw.toString()
    let metas = await renderMeta();
    metas.forEach(meta => {
      if(meta.content !== '') {
        body = body.replace(String(meta.name), `${meta.content}`)
        return
      }
      body = body.replace(String(meta.name), '')
    })
    // Return response
    return body;
  } catch(err) {
    console.log(err)
    throw new Error('Create Content error')
  }
}

app.use(express.static(path.join(__dirname, "build")))

app.get("/*", async (req, res) => {
  envUris.originalPath = req.path;
  const page = await renderPage();
  res.send(page);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"))
})

const port = process.env.PORT || 80
app.listen(port, () => {
  envUris.frontendBaseUrl = process.env.REACT_APP_FRONTEND_URL;
  envUris.apiBase = process.env.REACT_APP_API_URL;
  console.log(`Frontend app listening on port ${port}`)
})
/* tslint:enable */
