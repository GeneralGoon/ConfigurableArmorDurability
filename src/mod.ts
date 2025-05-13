import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";

class Mod implements IPostDBLoadMod
{
    private modConfig = require("../config/config.json");

    public postDBLoad(container: DependencyContainer): void
    {
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);

        for (const item of items) 
        {
            if (itemHelper.isOfBaseclass(item._id, BaseClasses.ARMOR_PLATE))
            {
                item._props.Durability = (item._props.Durability * this.modConfig.plateDurabilityMult);
                item._props.MaxDurability = (item._props.MaxDurability * this.modConfig.plateDurabilityMult);
                item._props.BluntThroughput = (item._props.BluntThroughput * this.modConfig.plateBluntDamageMult);
            }
            if (itemHelper.isOfBaseclass(item._id, BaseClasses.BUILT_IN_INSERTS))
            {
                item._props.Durability = (item._props.Durability * this.modConfig.insertDurabilityMult);
                item._props.MaxDurability = (item._props.MaxDurability * this.modConfig.insertDurabilityMult);
                item._props.BluntThroughput = (item._props.BluntThroughput * this.modConfig.insertBluntDamageMult);
            }
            if (itemHelper.isOfBaseclass(item._id, BaseClasses.ARMORED_EQUIPMENT))
            {
                item._props.Durability = (item._props.Durability * this.modConfig.plateDurabilityMult);
                item._props.MaxDurability = (item._props.MaxDurability * this.modConfig.plateDurabilityMult);
                item._props.BluntThroughput = (item._props.BluntThroughput * this.modConfig.plateBluntDamageMult);
            }
        }
    }
}

export const mod = new Mod();