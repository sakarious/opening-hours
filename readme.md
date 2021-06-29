## Install / Clone Repo

$ git clone https://github.com/sakarious/opening-hours.git

$ cd opening-hours.git

## Installation

```bash

$ npm install

```

## Running the app

```bash

# development

$ npm run start

```

#### Tell us what do you think about the data format. Is the current JSON structure the best way to store that kind of data or can you come up with a better version? There are no right answers here 🙂. Please write your thoughts to readme.md.

I think the payload could have been simplified futher by replacing `"type"` and `"value"` with `"opening_time"` and `"closing_time"`.

This way the open and close times are _contained_ in one object, which could also simplify the logic of closing events over midnight. However, it might be tricky to assess if a smaller `"closing_time"` value means _over midnight_ closing or a mere error in the data. It might then be a good idea to look into an additional parameter `"next_day"` to ensure data validity.

```{
  "monday": [
    {
      "opening_time": 32400,
      "closing_time": 3600,
      "next_day": true
    }
  ]
}
```
