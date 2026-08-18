import random

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


def compute_score(company):
    max_revenue = max(item["revenue"] for item in COMPANIES)
    max_employees = max(item["employees"] for item in COMPANIES)
    revenue_score = company["revenue"] / max_revenue
    employee_score = company["employees"] / max_employees
    return round((revenue_score * 0.7) + (employee_score * 0.3), 4)


def get_company_battle_round():
    left, right = random.sample(COMPANIES, 2)
    left_score = compute_score(left)
    right_score = compute_score(right)

    left_item = {
        "id": left["id"],
        "name": left["name"],
        "revenue": left["revenue"],
        "employees": left["employees"],
        "tag": left["tag"],
        "score": left_score,
        "summary": f"매출 {left['revenue']}조 · 직원 {left['employees']}명",
    }
    right_item = {
        "id": right["id"],
        "name": right["name"],
        "revenue": right["revenue"],
        "employees": right["employees"],
        "tag": right["tag"],
        "score": right_score,
        "summary": f"매출 {right['revenue']}조 · 직원 {right['employees']}명",
    }

    return {
        "title": "기업 배틀",
        "description": "매출과 직원 수를 종합한 점수로 더 큰 기업을 고르는 게임",
        "companies": [left_item, right_item],
        "winner": "left" if left_score >= right_score else "right",
    }
