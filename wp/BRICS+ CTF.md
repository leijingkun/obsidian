# web
### ChadGPT

```go
defer cancel()
		rows, err := db.QueryContext(ctx, `SELECT reply FROM replies WHERE LOWER(prompt) LIKE '%`+strings.ToLower(q.Q)+`%' LIMIT 1`)
		//SELECT reply FROM replies WHERE LOWER(prompt) LIKE '%a%' LIMIT 1
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			log.Printf("Failed to query db: %v", err)
			fmt.Fprintf(w, "Failed to query db\n")
			return
		}
		defer rows.Close()

		var reply string
		if !rows.Next() {
			reply = "I'm a language model, I can't do it."
		} else {
			if err := rows.Scan(&reply); err != nil {
				log.Printf("Failed to scan db: %v", err)
			}
			// TODO: handle maxTokens param.
		}

func sqlSafe(s string) string {
	s = strings.ReplaceAll(s, "'", "''")
	s = strings.ReplaceAll(s, "\"", "\"\"")
	return s
}
```


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-24   22:41