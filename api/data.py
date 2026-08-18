COMPANIES = [
    {"id": 1, "name": "넥슨", "revenue": 4.0, "employees": 7700, "tag": "게임"},
    {"id": 2, "name": "크래프톤", "revenue": 2.4, "employees": 1900, "tag": "게임"},
    {"id": 3, "name": "삼성전자", "revenue": 85.0, "employees": 131000, "tag": "전자"},
    {"id": 4, "name": "카카오", "revenue": 5.6, "employees": 21600, "tag": "플랫폼"},
    {"id": 5, "name": "네이버", "revenue": 6.3, "employees": 23300, "tag": "검색"},
    {"id": 6, "name": "현대자동차", "revenue": 51.0, "employees": 75000, "tag": "자동차"},
    {"id": 7, "name": "LG전자", "revenue": 22.0, "employees": 82000, "tag": "전자"},
    {"id": 8, "name": "CJ ENM", "revenue": 3.4, "employees": 6600, "tag": "미디어"},
    {"id": 9, "name": "배달의민족", "revenue": 1.0, "employees": 4800, "tag": "배달"},
    {"id": 10, "name": "당근마켓", "revenue": 1.3, "employees": 4700, "tag": "커머스"},
]


def get_company_battle_round():
    left = COMPANIES[0]
    right = COMPANIES[1]

    return {
        "title": "기업 배틀",
        "description": "매출과 직원 수를 기준으로 더 큰 기업을 고르는 간단한 게임",
        "companies": [
            {
                "id": left["id"],
                "name": left["name"],
                "revenue": left["revenue"],
                "employees": left["employees"],
                "tag": left["tag"],
                "score": left["revenue"],
                "summary": f"매출 {left['revenue']}조 · 직원 {left['employees']}명",
            },
            {
                "id": right["id"],
                "name": right["name"],
                "revenue": right["revenue"],
                "employees": right["employees"],
                "tag": right["tag"],
                "score": right["revenue"],
                "summary": f"매출 {right['revenue']}조 · 직원 {right['employees']}명",
            },
        ],
        "winner": "left" if left["revenue"] >= right["revenue"] else "right",
    }
