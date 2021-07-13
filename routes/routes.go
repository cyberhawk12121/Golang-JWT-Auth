package routes

import (
	"go_auth/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// Fiber library is used to run a persistent server
	app.Post("/api/register/", controllers.Register)
	app.Post("/api/login/", controllers.Login)
	app.Get("/api/user/", controllers.User)
	app.Get("/api/logout/", controllers.Logout)
}
