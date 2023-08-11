# web

# reverse

# pwn

# crypto

# Misc
### 
gpt秒了
```python
def decompress(compressed_file, decompressed_file):
    with open(compressed_file, 'rb') as f:
        data = f.read()

    # Read frequency information
    num_frequencies = data[0]
    frequencies = {}
    for i in range(num_frequencies):
        byte = data[1 + i * 5]
        freq = (data[2 + i * 5] << 24) + (data[3 + i * 5] << 16) + (data[4 + i * 5] << 8) + data[5 + i * 5]
        frequencies[byte] = freq

    root = build_huffman_tree(frequencies)
    huffman_codes = {}
    build_huffman_codes(root, '', huffman_codes)
    reverse_huffman_codes = {code: byte for byte, code in huffman_codes.items()}

    # Read compressed data
    start = 1 + num_frequencies * 5
    compressed_data = ''
    for byte in data[start:]:
        compressed_data += '{:08b}'.format(byte)

    with open(decompressed_file, 'wb') as f:
        current_code = ''
        for bit in compressed_data:
            current_code += bit
            if current_code in reverse_huffman_codes:
                f.write(bytes([reverse_huffman_codes[current_code]]))
                current_code = ''
```


### code
```python
sensitive_strings = ['open','chm','get','env','\\x','bind', 'listen', 'read', 'write', 'asm', 'exe', 'sys', 'sh', 'popen', 'mprotect', 'map']
```
---
# *相关wp*




2023-08-11   19:44