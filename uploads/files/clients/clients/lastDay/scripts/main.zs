import loottweaker.LootTweaker;
import loottweaker.vanilla.loot.LootTable;
import loottweaker.vanilla.loot.LootPool;
import loottweaker.vanilla.loot.Functions;

val gun_ammo = <cgm:basic_ammo>;
val tf2_ammo = <rafradek_tf2_weapons:ammo_box>;
val big_p = <animania:raw_prime_pork>;
val big_b = <animania:raw_prime_beef>;
val big_c = <animania:raw_prime_chicken>;
val small_p = <minecraft:porkchop>;
val small_c = <minecraft:chicken>;
val small_b = <minecraft:beef>;
val salt = <xlfoodmod:salt>;
val charc = <minecraft:coal:1>;
val gunp = <minecraft:gunpowder>;

recipes.addShapeless("pork",small_p*2,[big_p]);
recipes.addShapeless("beef",small_b*2,[big_b]);
recipes.addShapeless("chick",small_c*2,[big_c]);
recipes.addShapeless("gp",gunp,[salt,charc]);
recipes.addShaped("ammo", tf2_ammo,
[[gun_ammo,gun_ammo,gun_ammo],
[gun_ammo,gun_ammo,gun_ammo],
[gun_ammo,gun_ammo,gun_ammo]]);

mods.recipestages.Recipes.setRecipeStageByMod("build_stage1", "buildcraftcore");
mods.recipestages.Recipes.setRecipeStageByMod("build_stage1", "buildcraftsilicon");
mods.recipestages.Recipes.setRecipeStageByMod("build_stage1", "buildcrafttransport");
mods.recipestages.Recipes.setRecipeStageByMod("car_stage1", "car");
mods.recipestages.Recipes.setRecipeStage("turret_stage", "hundreddayz:turret");

val desert_pyramid = LootTweaker.getTable("minecraft:chests/desert_pyramid");
val ammo = desert_pyramid.addPool("ammo", 1, 12, 0, 0);
val abandoned_mineshaft = LootTweaker.getTable("minecraft:chests/abandoned_mineshaft");
val x_ammo = desert_pyramid.addPool("x_ammo", 1, 12, 0, 0);
val jungle_temple = LootTweaker.getTable("minecraft:chests/jungle_temple");
val a_ammo = jungle_temple.addPool("a_ammo", 1, 12, 0, 0);
val a_main = jungle_temple.getPool("main");
val village_blacksmith = LootTweaker.getTable("minecraft:chests/village_blacksmith");
val b_ammo = village_blacksmith.addPool("b_ammo", 1, 12, 0, 0);
val b_main = village_blacksmith.getPool("main");
val simple_dungeon = LootTweaker.getTable("minecraft:chests/simple_dungeon");
val c_ammo = simple_dungeon.addPool("c_ammo", 1, 12, 0, 0);
val c_main = simple_dungeon.getPool("main");
val c_pooll = simple_dungeon.getPool("pool2");

b_ammo.addItemEntryJson(<xlfoodmod:speedy_energy_drink>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:healthy_energy_drink>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:corn_bread>, 3, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:rice_bread>, 3, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:baguette>, 3, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:potato_bread>, 5, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<xlfoodmod:cheese>, 5, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:potato>, 5, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:iron_ingot>, 1, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:gold_ingot>, 3, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<biomesoplenty:black_dye>, 3, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:wheat_seeds>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:melon_seeds>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:pumpkin_seeds>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<spartanweaponry:staff_iron>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<firstaid:bandage>, 5, 1, [{"count": {"min": 1.0, "max": 2.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<firstaid:plaster>, 3, 1, [{"count": {"min": 1.0, "max": 2.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<minecraft:gunpowder>, 3, 1, [{"count": {"min": 1.0, "max": 7.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<cgm:scope>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_ammo.addItemEntryJson(<cgm:scope:1>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
b_main.clearEntries();
c_main.clearEntries();
a_main.clearEntries();
c_pooll.clearEntries();
c_ammo.addItemEntryJson(<minecraft:diamond>, 1, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<minecraft:iron_ingot>, 3, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<minecraft:gold_ingot>, 3, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<minecraft:bone>, 3, 1, [{"count": {"min": 2.0, "max": 8.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:basic_ammo>, 3, 1, [{"count": {"min": 2.0, "max": 15.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:advanced_ammo>, 5, 1, [{"count": {"min": 2.0, "max": 15.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:grenade>, 3, 1, [{"count": {"min": 1.0, "max": 3.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:stun_grenade>, 3, 1, [{"count": {"min": 1.0, "max": 3.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<spartanweaponry:greatsword_diamond>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<rafradek_tf2_weapons:building_box:21>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<rafradek_tf2_weapons:building_box:20>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:missile>, 3, 1, [{"count": {"min": 1.0, "max": 5.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<firstaid:morphine>, 3, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<minecraft:golden_apple>, 3, 1, [{"count": {"min": 1.0, "max": 3.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:shell>, 3, 1, [{"count": {"min": 1.0, "max": 4.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<minecraft:gunpowder>, 3, 1, [{"count": {"min": 1.0, "max": 7.0}, "function": "minecraft:set_count"}], []);
c_ammo.addItemEntryJson(<cgm:scope:2>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
a_ammo.addItemEntryJson(<rafradek_tf2_weapons:stickybomb>, 1, 1, [{"count": {"min": 1.0, "max": 1.0}, "function": "minecraft:set_count"}], []);
a_ammo.addItemEntryJson(<rafradek_tf2_weapons:ammo:11>, 1, 1, [{"count": {"min": 32.0, "max": 32.0}, "function": "minecraft:set_count"}], []);
a_ammo.addItemEntryJson(<firstaid:morphine>, 1, 1, [{"count": {"min": 1.0, "max": 3.0}, "function": "minecraft:set_count"}], []);
a_ammo.addItemEntryJson(<spartanweaponry:arrow_explosive>, 1, 1, [{"count": {"min": 4.0, "max": 32.0}, "function": "minecraft:set_count"}], []);

mods.MobStages.addStage("20th", "minecraft:creeper");
