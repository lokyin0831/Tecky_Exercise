// Declaration of Class and its methods
export class Player {
    private strength: number;
    private name: string;

    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
    }

    attack(monster: Monster) {
        while (monster.hp > 0) {
            if (Math.random() < 0.8) {
                console.log(`Player ${this.name} attacks a monster (HP: ${monster.hp - this.strength})`)
                monster.setHP(monster.hp - this.strength)
            } else {
                let damage: number = monster.hp - this.strength * 2
                if (monster.hp == this.strength) {
                    console.log(`Player ${this.name} attacks a monster (HP: 0) [CRITICAL]`)
                    monster.setHP(0)
                } else {
                    console.log(`Player ${this.name} attacks a monster (HP: ${damage}) [CRITICAL]`)
                    monster.setHP(monster.hp - this.strength * 2)
                }

            }
        }


    }



    gainExperience(exp: number) {

    }

}


export class Monster {
    public hp: number = 200;


    injure(strength: number) {

    }

    getHP() {
        return this.hp;
    }

    setHP(num: number) {
        this.hp = num;
    }

}


// Invocations of the class and its methods
const player = new Player(20, 'Peter');
const monster = new Monster();
player.attack(monster);
// English counterpart: Player attacks monster

