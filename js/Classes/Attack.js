var setupAttackClass = function(data){

    class Attack extends Sprite{
        constructor(imgName, x, y, options, bonusOptions){
            super(imgName, x, y, options, bonusOptions);
            this.type = 'attack';
            this.options = options;
            // imgName can be blank if invisible

            // options example:
            // {
            //     damage: 10,
            //     modifiedHitcircle: {r: 5},
            //     damageType: "physical",
            //     fromType: this.type // does the attack belong to the player or an enemy?
            // }
            
            // is this attack from the player? or from the enemies?
            if (options.fromType == 'player'){
                Attack.playerAttacks.push(this);
            } else if (options.fromType == 'enemy'){
                Attack.enemyAttacks.push(this);
            }
        }
        
        
        update(){
            // for now this should remove attacks that havent collided in their 1 frame of life
            // in the future ill have to make something more elaborate
            this.markedForDeath = true;
        }    
    }

    Attack.enemyAttacks = [];
    Attack.playerAttacks = [];

    Attack.playerAttackCallback = function(){

    }


    return Attack;
}