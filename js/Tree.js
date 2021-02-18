function setupTreeClass(){

    class Tree extends Sprite{
        constructor(imgName, x, y, options, bonusOptions){
            
            super(imgName, x, y, options, bonusOptions);
            // trees are initialized, like all scenery, in the setupWorld function.
            // they are initialized by creating a cillision-enabled trunk, and an associated treetop sprite is then automatically generated on top

            

            if (bonusOptions.evergreen){
                this.treetop = new Sprite("treetop", x, y-64);
                this.treetop.frame = [0, 1];
                objectsToUpdateLast.push(this.treetop);
            } else {
                this.treetop = new Sprite("treetop", x, y-56);
                objectsToUpdateLast.push(this.treetop);
            }
        }

    }

    return Tree;
}