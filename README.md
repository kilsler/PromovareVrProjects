# Current progress
- `auth_demo_01` Example of using backend endpoints  
- `auth-demoJWT` Backend project written using SPring framework  
## Current backend endpoints  
### Public(no token needed)

- `POST: /auth/register` Registers new user 
Expected data  
```
{
  "username": "user1",
  "password": "1234"
}
```
- `POST: /auth/login` Returns jwt token 
Expected data  
```
{
  "username": "user1",
  "password": "1234"
}
```
Expected return  
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTc0OTkwODAxNTA4NX0=.Y6arXWaogslQ96vfMTA1qREq7DCtkwvJMttllY4cAms"
}
```
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
        "videoUrl": "videoURL",
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
        "videoUrl": "videoURL",
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
### Private token needed
Token should be given in header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
    "videoUrl": "videoURL",
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
- `PUT: /api/projects/{projectId}` Updates project data  
In case if photos array is empty("photos":[]) then it will use old values ,else it will rewrite the photos array for project.
Expected example of data:
```
{
    "name": "Name of project",
    "description": "description",
    "videoUrl": "videoURL",
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

## Current SQL script for MYSQL
```
sql
CREATE TABLE author (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(255)
);

CREATE TABLE project_authors (
    project_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    PRIMARY KEY (project_id, author_id),
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES author(id) ON DELETE CASCADE
);

CREATE TABLE link (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(500) NOT NULL,
    project_id BIGINT,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE photo (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image LONGBLOB NOT NULL,
    project_id BIGINT,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
