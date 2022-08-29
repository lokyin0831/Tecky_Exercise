interface Attack {
    damage: number
    name: string
}

class BowAndArrow implements Attack {
    damage: number
    name: string
    constructor(damage: number, name:string) {
        this.damage = damage
        this.name = name
    }
}

class ThrowingSpear implements Attack {
    damage: number
    name: string
    constructor(damage: number, name:string) {
        this.damage = damage
        this.name = name
    }
}

class Swords implements Attack {
    damage: number
    name: string
    constructor(damage: number, name:string) {
        this.damage = damage
        this.name = name
    }
}

class MagicSpells implements Attack {
    damage: number
    name: string
    constructor(damage: number, name:string) {
        this.damage = damage
        this.name = name
    }
}


interface Player {
    attack(monster: Monster): void;
    switchAttack(): void;
    gainExperience(exp: number): void;
}

class Amazon implements Player {

    private primary: Attack;
    private secondary: Attack;
    private usePrimaryAttack: boolean;
    constructor() {
        this.primary = new BowAndArrow(30, "Bow and Arrow");
        this.secondary = new ThrowingSpear(40, "Throwing Spear");
        this.usePrimaryAttack = true;
    }


    attack(monster: Monster): void {
        if (this.usePrimaryAttack) {
            let currentHP:number = monster.getHP()
            console.log(`A player use primary attack and deal ${this.primary.damage} damage with ${this.primary.name}, monster current HP is ${currentHP - this.primary.damage}.`)
            monster.setHP(currentHP - 30);
        } else {
            let currentHP:number = monster.getHP()
            console.log(`A player use secondary attack and deal ${this.secondary.damage} damage with ${this.secondary.name}, monster current HP is ${currentHP - this.secondary.damage}.`)
            monster.setHP(currentHP - 40);
        }
    }

    switchAttack() {
        if (this.usePrimaryAttack) {
            this.usePrimaryAttack = false
        } else {
            this.usePrimaryAttack = true
        }
    }

    gainExperience(exp: number): void {
        throw new Error("Method not implemented.");
    }
    //.. The remaining methods.
}

class Paladin implements Player {

    private primary: Attack;
    private secondary: Attack;
    private usePrimaryAttack: boolean;
    constructor() {
        this.primary = new Swords(50, "Swords");
        this.secondary = new MagicSpells(25, "Magic Spells");
        this.usePrimaryAttack = true;
    }


    attack(monster: Monster): void {
        if (this.usePrimaryAttack) {
            let currentHP:number = monster.getHP()
            console.log(`A player use primary attack and deal ${this.primary.damage} damage with ${this.primary.name}, monster current HP is ${currentHP - this.primary.damage}.`)
            monster.setHP(currentHP - 50);
        } else {
            let currentHP:number = monster.getHP()
            console.log(`A player use secondary attack and deal ${this.secondary.damage} damage with ${this.secondary.name}, monster current HP is ${currentHP - this.secondary.damage}.`)
            monster.setHP(currentHP - 25);
        }
    }

    switchAttack() {
        if (this.usePrimaryAttack) {
            this.usePrimaryAttack = false
        } else {
            this.usePrimaryAttack = true
        }
    }

    gainExperience(exp: number): void {
        throw new Error("Method not implemented.");
    }
    //.. The remaining methods.
}

class Barbarian implements Player {

    private primary: Attack;
    private secondary: Attack;
    private usePrimaryAttack: boolean;
    constructor() {
        this.primary = new Swords(55, "Swords");
        this.secondary = new ThrowingSpear(30, "Throwing Spear");
        this.usePrimaryAttack = true;
    }


    attack(monster: Monster): void {
        if (this.usePrimaryAttack) {
            let currentHP:number = monster.getHP()
            console.log(`A player use primary attack and deal ${this.primary.damage} damage with ${this.primary.name}, monster current HP is ${currentHP - this.primary.damage}.`)
            monster.setHP(currentHP - 55);
        } else {
            let currentHP:number = monster.getHP()
            console.log(`A player use secondary attack and deal ${this.secondary.damage} damage with ${this.secondary.name}, monster current HP is ${currentHP - this.secondary.damage}.`)
            monster.setHP(currentHP - 30);
        }
    }

    switchAttack() {
        if (this.usePrimaryAttack) {
            this.usePrimaryAttack = false
        } else {
            this.usePrimaryAttack = true
        }
    }

    gainExperience(exp: number): void {
        throw new Error("Method not implemented.");
    }
    //.. The remaining methods.
}

class Monster {
    public hp: number = 300;


    injure(strength: number) {

    }

    getHP() {
        return this.hp;
    }

    setHP(num: number) {
        this.hp = num;
    }

}
const player = new Amazon();
const player2 = new Paladin();
const player3 = new Barbarian();
const monster = new Monster();

player.attack(monster)
player.switchAttack()
player.attack(monster)
player2.attack(monster)
player2.switchAttack()
player2.attack(monster)
player3.attack(monster)
player3.switchAttack()
player3.attack(monster)