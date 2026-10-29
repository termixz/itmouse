import aiosqlite
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def init_db():
    async with aiosqlite.connect('database.db') as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT UNIQUE,
                password TEXT,
                balance REAL,
                avatar TEXT,
                purchased TEXT
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS houses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nameann TEXT,
                name TEXT,
                ph TEXT,
                photos TEXT,
                sold BOOLEAN,
                owner TEXT,
                price REAL,
                address TEXT,
                last TEXT,
                square1 TEXT,
                square2 TEXT,
                year TEXT,
                m1 TEXT,
                m2 TEXT,
                em TEXT,
                ag TEXT
            )
        """)
        await db.commit()

@app.on_event("startup")
async def startup():
    await init_db()

class User(BaseModel):
    login: str
    password: str
    balance: float = 0.0
    avatar: str = ""
    purchased: list = []

class House(BaseModel):
    nameann: str
    name: str
    ph: str
    photos: list = []
    sold: bool = False
    owner: str = ""
    price: float = 0.0
    address: str = ""
    last: str = ""
    square1: str = ""
    square2: str = ""
    year: str = ""
    m1: str = ""
    m2: str = ""
    em: str = ""
    ag: str = ""

@app.post("/users/")
async def create_user(user: User):
    async with aiosqlite.connect('database.db') as db:
        try:
            await db.execute(
                "INSERT INTO users (login, password, balance, avatar, purchased) VALUES (?, ?, ?, ?, ?)",
                (user.login, user.password, user.balance, user.avatar, json.dumps(user.purchased))
            )
            await db.commit()
            return {"status": "ok"}
        except:
            raise HTTPException(status_code=400)

@app.get("/users/{login}")
async def get_user(login: str):
    async with aiosqlite.connect('database.db') as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE login = ?", (login,))
        row = await cursor.fetchone()
        if row:
            res = dict(row)
            res['purchased'] = json.loads(res['purchased'])
            return res
        raise HTTPException(status_code=404)

@app.put("/users/{login}")
async def update_user(login: str, user: User):
    async with aiosqlite.connect('database.db') as db:
        await db.execute(
            "UPDATE users SET balance = ?, avatar = ?, purchased = ? WHERE login = ?",
            (user.balance, user.avatar, json.dumps(user.purchased), login)
        )
        await db.commit()
        return {"status": "ok"}

@app.post("/houses/")
async def create_house(house: House):
    async with aiosqlite.connect('database.db') as db:
        await db.execute(
            """INSERT INTO houses (nameann, name, ph, photos, sold, owner, price, address, last, square1, square2, year, m1, m2, em, ag) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (house.nameann, house.name, house.ph, json.dumps(house.photos), house.sold, house.owner, house.price, house.address, house.last, house.square1, house.square2, house.year, house.m1, house.m2, house.em, house.ag)
        )
        await db.commit()
        return {"status": "ok"}

@app.get("/houses/")
async def get_houses():
    async with aiosqlite.connect('database.db') as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM houses")
        rows = await cursor.fetchall()
        res = []
        for r in rows:
            d = dict(r)
            d['photos'] = json.loads(d['photos'])
            res.append(d)
        return res

@app.put("/houses/{house_id}")
async def update_house(house_id: int, status: dict):
    async with aiosqlite.connect('database.db') as db:
        sold = status.get('sold', False)
        owner = status.get('owner', '')
        await db.execute("UPDATE houses SET sold = ?, owner = ? WHERE id = ?", (sold, owner, house_id))
        await db.commit()
        return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
