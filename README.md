# Current progress
- `auth_demo_01` Example of using backend endpoints  
- `auth-demoJWT` Backend project written using SPring framework  
## Current backend endpoints  

- `GET: /api/authors` Returns list of authors  
Example
```
[
    {
        "id": 1,
        "name": "Иван Иванов"
    },
    {
        "id": 2,
        "name": "Мария Петрова"
    },
    {
        "id": 3,
        "name": "Алексей Смирнов"
    }
]
```
- `GET: /api/projects`  Returns list of current projects
Example  
```
[
{
        "id": 4,
        "name": "asdasd",
        "description": "asdasd",
        "authors": [
            {
                "id": 1,
                "name": "Иван Иванов"
            }
        ],
        "links": [
            {
                "id": 5,
                "url": "https://github.com/project-aa"
            }
        ],
        "photos": [
          {
              "id":2,
              "image":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wB..." - written in base64
          }
        ]
    },
]

```

- `GET: /api/projects/{projectId}`  Returns project by id 
Example  
```

{
        "id": 4,
        "name": "asdasd",
        "description": "asdasd",
        "authors": [
            {
                "id": 1,
                "name": "Иван Иванов"
            }
        ],
        "links": [
            {
                "id": 5,
                "url": "https://github.com/project-aa"
            }
        ],
        "photos": [
          {
              "id":2,
              "image":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wB..." - written in base64
          }
        ]
    },

```

- `POST: /api/projects/{projectId}/photos` Uploads on used id image(completely rewrites images, so send old images with the new one)
Expects file 
```
{
  "image": "iVBORw0KGgoAAAANSUhEUgAAADIA..." // Base64 строка
}
```

- `POST: /api/projects/` Adds project
Expected example of data:
```
{
    "name": "Name of project",
    "description": "description",
    "authors": [
        {
            "id": 1
        },
        {
            "id": 3
        }
    ],
    "links": [
        {
            "url": "https://github.com/project-first"
        },
        {
            "url": "https://github.com/project-second"
        }
    ],
    "photos": [
        {
            "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/4nY8SUNDX1BST0ZJTEUAAQEAAHYsYXBwbAQAAABzY25yUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwQVBQTAAAAABBUFBMAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwztRYAMEZtDPzYjzFqRlPTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApoG5sIuD7V01zpLlWt4o1E9qzLkOCjR7toCkttO1iPujJBJPSudkieMI7kYlU4wQTgEjkA8cg9a6sNiY1FZFVaLiNWMAFyQenB9D3+n9ahH1xUmCcgjoPypBjFda0OdjDg/MBtXgYB/X9KXBOSvAGBxx1pwwCMjn3oOCOT93oPWi4Ib0Gcgk8/ke9HyhTnr9OM/n6Zp7AkbgMdAccfTim5wA7jJJ/A47UXHYMA4x16U3ilAUYblu57YPbmlI6luQaCLWGcgYPAYZxxzzxmj5cZ6Y6DtzRjB+Yfh9acQcBzyDwPw7UAxG5CnPTjHsKQ57nPAo+hxnjilAxnByAO/FVsIPpTeOM9OKflD/ALIGB6/jQvyEE55HIHB560gGnacALgAD8aaVGC2QDnG3nPPf6VJtwAc9ewzxTcdO+KENCCF2XcORtLdegHBpGADYTOB3NPKiM84JPPtg9OKAH2sVHGPm+meKpDfoRHGBtznHPsaByBngHv7jtSnpSc7cdqroRcFXd8vQjn8qbTtig4ByM0mO9CGIQoHvxj0po3E5XJbqPrTz8uCMHH5flUXt0B7VSENJz"
        }
    ]
}

```
- `POST: /api/projects/{projectId}` Updates project data  
In case if photos array is empty("photos":[]) then it will use old values ,else it will rewrite the photos array for project.
Expected example of data:
```
{
    "name": "Name of project",
    "description": "description",
    "authors": [
        {
            "id": 1
        },
        {
            "id": 3
        }
    ],
    "links": [
        {
            "url": "https://github.com/project-first"
        },
        {
            "url": "https://github.com/project-second"
        }
    ],
    "photos": [
        {
            "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/4nY8SUNDX1BST0ZJTEUAAQEAAHYsYXBwbAQAAABzY25yUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwQVBQTAAAAABBUFBMAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwztRYAMEZtDPzYjzFqRlPTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApoG5sIuD7V01zpLlWt4o1E9qzLkOCjR7toCkttO1iPujJBJPSudkieMI7kYlU4wQTgEjkA8cg9a6sNiY1FZFVaLiNWMAFyQenB9D3+n9ahH1xUmCcgjoPypBjFda0OdjDg/MBtXgYB/X9KXBOSvAGBxx1pwwCMjn3oOCOT93oPWi4Ib0Gcgk8/ke9HyhTnr9OM/n6Zp7AkbgMdAccfTim5wA7jJJ/A47UXHYMA4x16U3ilAUYblu57YPbmlI6luQaCLWGcgYPAYZxxzzxmj5cZ6Y6DtzRjB+Yfh9acQcBzyDwPw7UAxG5CnPTjHsKQ57nPAo+hxnjilAxnByAO/FVsIPpTeOM9OKflD/ALIGB6/jQvyEE55HIHB560gGnacALgAD8aaVGC2QDnG3nPPf6VJtwAc9ewzxTcdO+KENCCF2XcORtLdegHBpGADYTOB3NPKiM84JPPtg9OKAH2sVHGPm+meKpDfoRHGBtznHPsaByBngHv7jtSnpSc7cdqroRcFXd8vQjn8qbTtig4ByM0mO9CGIQoHvxj0po3E5XJbqPrTz8uCMHH5flUXt0B7VSENJz"
        }
    ]
}

```
- `DELETE: /api/projects/{projectId}` removes the project by Id 
- `DELETE: /api/projects/photos/{photoId}` removes the photo by it's Id  

