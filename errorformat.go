//go:generate gopherjs build .

// Main package for https://github.com/gopherjs/gopherjs.
package main

import (
	"encoding/json"
	"strings"

	"github.com/gopherjs/gopherjs/js"
	"github.com/reviewdog/errorformat"
)

func main() {
	js.Global.Set("errorformat", map[string]interface{}{"Errorformat": Errorformat})
}

// Errorformat returns JSON array of errorformat.Enttry in string or return
// error.
func Errorformat(efms []string, text string) (string, string) {
	fmt, err := errorformat.NewErrorformat(efms)
	if err != nil {
		return "", err.Error()
	}
	var entries []*errorformat.Entry
	s := fmt.NewScanner(strings.NewReader(text))
	for s.Scan() {
		entries = append(entries, s.Entry())
	}
	bs, err := json.Marshal(entries)
	if err != nil {
		return "", err.Error()
	}
	return string(bs), ""
}
