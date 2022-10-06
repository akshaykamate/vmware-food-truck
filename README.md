# Food truck

## task

Lunch is important and knowing our lunch choices is even more so. While our office manager publishes a paper copy of the food truck schedule once a month, we’d like this service to be available digitally, so we can choose our lunch from the comfort of our desks. For an internal hackathon, you’ve been asked to write a server-and-UI into which we can manually add the food trucks for each month, and access today's choices. The requirements are:

- A RESTful API that allows:
  - Data entry of the food trucks for each day.
    - Each food truck only needs a name and a date, not a location.
  - Editing food trucks if we have a typo.
  - Listing today’s Food trucks.
- A UI that consumes the above API, and...
  - Permits easy data entry.
  - Allows a quick view of today's Food Truck options.
- A persistence layer of your choice.
- Assume it is running on a retired Linux server inside our firewall, so no authentication is needed.
- Use a GitHub repo for your code and send us the repo.

## Setup

Run below commands to build and deploy using docker

```sh
$ git clone https://github.com/akshaykamate/vmware-food-truck
```

To run this application requires docker preinstalled.
- [docker installation steps](https://www.docker.com/get-started/)

```sh
$ make build # Docker build
$ make db-init # Database table sync
```

Made with ❤

[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/akshay-kamate-14b71485/)
