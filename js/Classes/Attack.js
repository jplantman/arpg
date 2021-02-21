var setupAttackClass = function(data){

    class Attack extends Sprite{
        constructor(imgName, x, y, options, bonusOptions){
            super(imgName, x, y, options, bonusOptions);
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
                Attack.playerAttacks.push(this)
                enableCollisions(this, {
                    target: Enemy.array,
                    type: 'circlevscircles',
                    options: {
                        resolution: false,
                        killOnContact: true
                    },
                });
            } else if (options.fromType == 'enemy'){
                Attack.enemyAttacks.push(this)
            }
        }
        
        
        update(){
            // this.markedForDeath = true;
        }    
    }

    Attack.enemyAttacks = [];
    Attack.playerAttacks = [];

    Attack.playerAttackCallback = function(){

    }


    return Attack;
}