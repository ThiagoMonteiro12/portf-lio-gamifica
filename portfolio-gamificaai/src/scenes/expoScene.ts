import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { player } from "../Actors/player";
import { Npc } from "../Actors/npc";

export class expoScene extends Scene{

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        //Carregar música de fundo(BGM)
        let musicafundo = Resources.ritmadaBGM

        //Configurar e executar
        musicafundo.loop = true
        musicafundo.play(0.5)

        engine.toggleDebug()

        let tiledMap = Resources.Mapa

    //Definir o offset para renderização do mapa        
        let offsetX = 138
        let offsetY = 100
        //Adicionar o mapa a cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX , offsetY)
        })
        //Definir o zoom da camera pra aumentar o pouco a visualização
        this.camera.zoom =1.2

        //Carregar spawn point do player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        //Criação e configuração do Player
        let Jogador = new player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

            Jogador.z = 1
        //Adicionar o jogador a cena
        this.add(Jogador)

        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointb = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointc = tiledMap.getObjectsByName("npc_c")[0]
        let npcSpawnPointd = tiledMap.getObjectsByName("npc_d")[0]

        //configurar NPCs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "npcA",
        )
        let npcB = new Npc(
            vec(npcSpawnPointb.x + offsetX, npcSpawnPointb.y + offsetY),
            Color.Blue,
            "npcB",
        )
        let npcC = new Npc(
            vec(npcSpawnPointc.x + offsetX, npcSpawnPointc.y + offsetY),
            Color.Blue,
            "npcC",
        )
        let npcD = new Npc(
            vec(npcSpawnPointd.x + offsetX, npcSpawnPointd.y + offsetY),
            Color.Blue,
            "npcD",
        )
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)
        this.add(npcD)

        //Adicionar colisão com cada objeto

        // 1 - Pegar a camada de objetos colisores

        let camadaObjetosColisores = tiledMap.getObjectLayers("objetosColisantes")[0]

        console.log(camadaObjetosColisores)

        //Vamos percorrer com for each para cada objeto renderizar com o actor
        camadaObjetosColisores.objects.forEach(Object => {
            //Configurar o actor
            const objetoAtual = new Actor({
                name: Object.name,
                x: Object.x + offsetX + (Object.tiledObject.width! / 2),
                y: Object.y + offsetY + (Object.tiledObject.height! / 2),
                width: Object.tiledObject.width,
                height: Object.tiledObject.height,
                collisionType: CollisionType.Fixed,
                z: 99
            })

            //Adicionar o colisor do objeto na cena
            this.add(objetoAtual)
        })
    }
}

