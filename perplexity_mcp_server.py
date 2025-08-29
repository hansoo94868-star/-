import requests
import os

API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL = "https://api.perplexity.ai/chat/completions"

def ask_perplexity(question):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "pplx-7b-chat",
        "messages": [
            {"role": "user", "content": question}
        ]
    }
    response = requests.post(API_URL, headers=headers, json=data)
    if response.status_code == 200:
        answer = response.json()["choices"][0]["message"]["content"]
        return answer
    else:
        return f"Error: {response.status_code} - {response.text}"

if __name__ == "__main__":
    print("Perplexity MCP Server가 실행되었습니다.")
    while True:
        user_input = input("질문을 입력하세요 (종료하려면 'exit'): ")
        if user_input.lower() == "exit":
            break
        reply = ask_perplexity(user_input)
        print("퍼플렉시티:", reply)