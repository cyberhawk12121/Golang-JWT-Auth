package models

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"Name"`
	Username string `json:"username" gorm:"unique"`
	Email    string `json:"email" gorm:"unique"`
	Password []byte `json:"-"` // - sign will make sure password isn't shown in the results
}
