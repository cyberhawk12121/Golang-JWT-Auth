package controllers

import (
	"go_auth/database"
	"go_auth/models"

	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// secret key
const SecretKey = "oho4u120491njbafnij10294u1p2149i1029ijrnjasnuzohnp9-i"

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
		// log.Fatal(err)
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14) //14 is the cost of the hash
	user := models.User{
		ID:       0,
		Name:     data["name"],
		Username: data["username"],
		Email:    data["email"],
		Password: password,
	}
	database.DB.Create(&user)
	return c.JSON(user)
	// return c.SendString("Hello, World 👋!")
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var user models.User

	// Query the database to find the unique email as it's an email based authentication
	database.DB.Where("email= ?", data["email"]).First(&user)
	if user.ID == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// IF we find the user, we'll compare the password
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect Password",
		})
	}
	// converting  user id to string for the JWT methods
	user_id_str := strconv.Itoa(int(user.ID))

	// ---------- This will generate a JWT cookie with this method HS256 -----------
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user_id_str,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // 1 Day
	})
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	// ---------- fiber.Cookie is used to generate Cookie ------------- //
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Path:     "",
		Domain:   "",
		MaxAge:   0,
		Expires:  time.Now().Add(time.Hour * 24),
		Secure:   false,
		HTTPOnly: true,
		SameSite: "",
	}
	// c.Cookie(&cookie_reference) is is used to save the cookie in the instance c
	c.Cookie(&cookie) // saved

	return c.JSON(fiber.Map{
		"message": "Success",
	})
}

// This function will return the authenticated user
func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{
		Audience:  "",
		ExpiresAt: 0,
		Id:        "",
		IssuedAt:  0,
		Issuer:    "",
		NotBefore: 0,
		Subject:   "",
	}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	// claims := token.Claims // This claims is an interface with only Valid() function
	// 	IF we want to get the "Issuer" we need the StandardClaims struct
	claims := token.Claims.(*jwt.StandardClaims) //Here we converted it to StandardClaims struct

	var user models.User

	database.DB.Where("ID= ?", claims.Issuer).First(&user)
	return c.JSON(user)
}

// To logout we just make another cookie with a past time
func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "",
		Domain:   "",
		MaxAge:   0,
		Expires:  time.Now().Add(-time.Hour),
		Secure:   false,
		HTTPOnly: false,
		SameSite: "",
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Logged out",
	})
}
