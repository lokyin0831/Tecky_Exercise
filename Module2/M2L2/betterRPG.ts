// interface Attack{
//     damage:number
//  }
 
//  class BowAndArrow implements Attack{
//       //Bow and Arrow Attack here
//  }
 
//  class ThrowingSpear implements Attack{
//     // Throwing Spear Attack here
//  }
 
 
//  interface Player{
//      attack(monster:Monster): void;
//      switchAttack(): void;
//      gainExperience(exp:number): void;
//  }
 
//  class Amazon implements Player{
//      private primary: Attack;
//      private secondary: Attack;
//      private usePrimaryAttack: boolean;
//      constructor(){
//          this.primary = new BowAndArrow(/*Need some params here*/);
//          this.secondary = new ThrowingSpear(/*Need some params here*/);
//          // TODO: set the default value of usePrimaryAttack
//       }
 
//       attack(monster:Monster):void{
//           if(this.usePrimaryAttack){
//              // TODO: use primary attack
//           }else{
//              // TODO: use secondary attack
//           }
//       }
      
//       switchAttack(){
//           // TODO: Change the attack mode for this player
//       }
 
//       //.. The remaining methods.
//  }
 
//  class Monster{
//  // You can use the `Monster` before
//  }