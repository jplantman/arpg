function setupItemsManager(player, world){
    // this controls the actual equipment and inventory for the player. The code in the gui is meant to be merely a display and interface, not the core data storage for items
    
    // console.log("inventoryMenu ", world.inventoryMenu.slots)
    // world.inventory.slots holds all the divs for the inventory slots in an array grid
    

    // we need a mirroring grid for the player. could be done for multiple player characters
    player.inventory = [];
    for (let y = 0; y < world.ui.inventoryMenu.slots.length; y++) {
        const row = world.ui.inventoryMenu.slots[y];
        player.inventory[y] = [];
        for (let x = 0; x < row.length; x++) {
            player.inventory[y][x] = 0; // empty slot

        }  
    }



    var testItem = {
        name: "Iron Dagger",
        imgName: "sword1",
        damageMin: 3,
        damageMax: 6,
        equippableSlots: [2, 4]
    }

    var testItem2 = {
        name: "Simple Staff",
        imgName: "staff1",
        damageMin: 2,
        damageMax: 4,
        equippableSlots: [2, 4]
    }

    function createItem(x, y, itemData){
        itemData.modW = 32;
        itemData.modH = 32;
        var item = new Item(itemData.imgName, x, y, itemData);
        objectsToUpdate.push(item); // later make "objectsToUpdateFirst"
    }

    world.addToInventory = function(player, item){
        var done = false;
        for (let y = 0; y < player.inventory.length; y++) {
            for (let x = 0; x < player.inventory[y].length; x++) {
                if (player.inventory[y][x] == 0){
                    player.inventory[y][x] = item;
                    done = true;
                    break;
                }
            }  
            if (done){ break; }
        }
    }

    world.ui.updateItemsMenu = function(){
        console.log(world.player.inventory, world.ui.inventoryMenu.slots);
        for (let y = 0; y < world.ui.inventoryMenu.slots.length; y++) {
            const row = world.ui.inventoryMenu.slots[y];
            for (let x = 0; x < row.length; x++) {
                const uiSlot = row[x];
                var dataSlot = player.inventory[y][x];
                
                if (dataSlot){
                    var imgSrc = dataSlot.imgObj.getAttribute('src');
                    uiSlot.style['background-image'] = "url('"+imgSrc+"')";
                    uiSlot.style['background-size'] = "100% 100%";
                } else {
                    uiSlot.style['background-image'] = "";
                    uiSlot.style['background-size'] = "";
                }
            }
            
        }
    }

    world.player.itemSelected;
    world.player.itemSelectedX;
    world.player.itemSelectedY;
    world.player.itemSelectedI; // for equipment slots
    world.player.itemSlotSelected;

    world.ui.clearSelection = function(){
        if (world.player.itemSlotSelected){
            world.player.itemSlotSelected.style['box-shadow'] = "";
        }
        world.player.itemSelected = undefined;
        world.player.itemSelectedX = undefined;
        world.player.itemSelectedY = undefined;
        world.player.itemSlotSelected = undefined;
        world.player.itemSelectedI = undefined;
    }

    world.ui.inventoryClick = function(x, y, item, element) { // whenever they click in their inventory
        if (world.player.itemSelected){
            // if an item is already selected
            if (item){
                // if an item is here too, switch them
                // switch them in the gui: (then after in th player inventory data)
                // put the selected item into the slot just clicked
                var slotJustClicked = world.ui.inventoryMenu.slots[y][x],
                    selectedImgSrc = world.player.itemSelected.imgObj.getAttribute('src');
                slotJustClicked.style['background-image'] = "url('"+selectedImgSrc+"')";
                slotJustClicked.style['background-size'] = "100% 100%";

                // put the item just clicked into the slot that was selected
                var justClickedImgSrc = item.imgObj.getAttribute('src');
                world.player.itemSlotSelected.style['background-image'] = "url('"+justClickedImgSrc+"')";
                world.player.itemSlotSelected.style['background-size'] = "100% 100%";

                // now gotta switch the items in the player's inventory data too
                world.player.inventory[y][x] = world.player.itemSelected;
                world.player.inventory[world.player.itemSelectedY][world.player.itemSelectedX] = item;

                // clear selection
                world.ui.clearSelection();
            } else { // no item here. move selected item to the clicked empty slot
                // in the ui
                var slotJustClicked = world.ui.inventoryMenu.slots[y][x],
                selectedImgSrc = world.player.itemSelected.imgObj.getAttribute('src');
                slotJustClicked.style['background-image'] = "url('"+selectedImgSrc+"')";
                slotJustClicked.style['background-size'] = "100% 100%";
                
                // and in the player inv data
                world.player.inventory[y][x] = world.player.itemSelected;

                // erase the item from the original slot
                world.player.itemSlotSelected.style['background-image'] = "";
                world.player.itemSlotSelected.style['background-size'] = "";
                if (world.player.itemSelectedX){ // selection came from inventory
                    world.player.inventory[world.player.itemSelectedY][world.player.itemSelectedX] = 0;
                } else { // selection came from equip
                    world.player.equip[ world.player.itemSelectedI ] = 0;
                }
                

                // clear selection
                world.ui.clearSelection();
            }
        } else if (item){ 
            // if an item is here, select it
            world.player.itemSelected = item;
            world.player.itemSelectedX = x;
            world.player.itemSelectedY = y;
            world.player.itemSlotSelected = element;
            element.style['box-shadow'] = "inset 0 0 8px 2px yellow";

        } // else, no item is here and no item is selected. so just do nothing
    }



  

    world.ui.dropSelectedItem = function(){
        // make the item newly on the ground
        // console.log(world.player.itemSelected)
        createItem(world.player.x, world.player.y, world.player.itemSelected);
        
        // erase the item from the original slot
        world.player.itemSlotSelected.style['background-image'] = "";
        world.player.itemSlotSelected.style['background-size'] = "";
        world.player.inventory[world.player.itemSelectedY][world.player.itemSelectedX] = 0;

        // clear selection
        world.ui.clearSelection();
    }

    ///// EQUIPMENT SLOTS /////////
    world.player.equip = 
    [
        0, // head
        0, // necklace
        0, // leftHand
        0, // body
        0, // rightHand
        0, // leftRing
        0, // feet
        0 // rightRing
    ]

    world.ui.equipClick = function(element) { // whenever they click in their inventory
        // if something is selected
        if ( world.player.itemSelected ){
            
            // check if selected item fits here
            if ( !world.player.itemSelected.equippableSlots.includes( element.index ) ){
                // item doesnt belong here
                return;
            }

            var itemHere = world.player.equip[element.index];
            if (itemHere){
                // an item is here. unequip it and equip selected
                
                // put equipped item into inventory
                var equippedItem = world.player.equip[ element.index ];
                world.player.inventory[world.player.itemSelectedY][world.player.itemSelectedX] = equippedItem;
                
                equippedItemSrc = equippedItem.getAttribute('src');
                element.style['background-image'] = "url('"+equippedItemSrc+"')";
                element.style['background-size'] = "100% 100%";

            } else {
                // no item here. equip selected
                selectedImgSrc = world.player.itemSelected.imgObj.getAttribute('src');
                element.style['background-image'] = "url('"+selectedImgSrc+"')";
                element.style['background-size'] = "100% 100%";

                world.player.equip[element.index] = world.player.itemSelected;

                // remove that item from the inventory where it was selected
                world.player.inventory[world.player.itemSelectedY][world.player.itemSelectedX] = 0;
                world.player.itemSlotSelected.style['background-image'] = "";
                world.player.itemSlotSelected.style['background-size'] = "";

                // clear selection
                world.ui.clearSelection();

            }
        } else {
            // no item is selected
            if ( world.player.equip[ element.index ] ){
                // if an item is here, select it
                world.player.itemSelected = world.player.equip[ element.index ];
                world.player.itemSelectedI = element.index;
                world.player.itemSlotSelected = element;
                element.style['box-shadow'] = "inset 0 0 8px 2px yellow";

            } // else, no item is here and no item is selected. do nothing
        }
        // console.log(element.index);
    }






    createItem(100, 100, testItem);
    createItem(100, 200, testItem2);

}