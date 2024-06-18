import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class player extends Actor {
    //Propriedade player
    private velocidade: number = 180

    private ultimaDirecao: string = "down"
    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    //Configuração do Player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }
    onInitialize(engine: Engine<any>): void {

        //Configurar sprite do player
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.playerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 4
                }
            }
        })
        //Criar as animações
        // config sprite do player
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.playerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 0
                }
            }
        })

        // let imagemPlayer = playerSpriteSheet.getSprite(1, 0)
        // imagemPlayer.scale = vec(1.3, 1.3)

        // criar animação
        // idle
        let duracaoFrameAnimacao = 70
        // idle esquerda
        const leftIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 1) },
                { graphic: playerSpriteSheet.getSprite(13, 1) },
                { graphic: playerSpriteSheet.getSprite(14, 1) },
                { graphic: playerSpriteSheet.getSprite(15, 1) },
                { graphic: playerSpriteSheet.getSprite(16, 1) },
                { graphic: playerSpriteSheet.getSprite(17, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-idle", leftIdle)

        // idle direita
        const rightIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 1) },
                { graphic: playerSpriteSheet.getSprite(1, 1) },
                { graphic: playerSpriteSheet.getSprite(2, 1) },
                { graphic: playerSpriteSheet.getSprite(3, 1) },
                { graphic: playerSpriteSheet.getSprite(4, 1) },
                { graphic: playerSpriteSheet.getSprite(5, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("right-idle", rightIdle)

        // idle cima
        const upIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 1) },
                { graphic: playerSpriteSheet.getSprite(7, 1) },
                { graphic: playerSpriteSheet.getSprite(8, 1) },
                { graphic: playerSpriteSheet.getSprite(9, 1) },
                { graphic: playerSpriteSheet.getSprite(10, 1) },
                { graphic: playerSpriteSheet.getSprite(11, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        // idle baixo
        const downIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 1) },
                { graphic: playerSpriteSheet.getSprite(19, 1) },
                { graphic: playerSpriteSheet.getSprite(20, 1) },
                { graphic: playerSpriteSheet.getSprite(21, 1) },
                { graphic: playerSpriteSheet.getSprite(22, 1) },
                { graphic: playerSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)


        // animação run
        // run esquerda
        const leftWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 2) },
                { graphic: playerSpriteSheet.getSprite(13, 2) },
                { graphic: playerSpriteSheet.getSprite(14, 2) },
                { graphic: playerSpriteSheet.getSprite(15, 2) },
                { graphic: playerSpriteSheet.getSprite(16, 2) },
                { graphic: playerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-walk", leftWalk)

        // run direita
        const rightWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 2) },
                { graphic: playerSpriteSheet.getSprite(1, 2) },
                { graphic: playerSpriteSheet.getSprite(2, 2) },
                { graphic: playerSpriteSheet.getSprite(3, 2) },
                { graphic: playerSpriteSheet.getSprite(4, 2) },
                { graphic: playerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)

        // run cima
        const upWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 2) },
                { graphic: playerSpriteSheet.getSprite(7, 2) },
                { graphic: playerSpriteSheet.getSprite(8, 2) },
                { graphic: playerSpriteSheet.getSprite(9, 2) },
                { graphic: playerSpriteSheet.getSprite(10, 2) },
                { graphic: playerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", upWalk)

        // run baixo
        const downWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 2) },
                { graphic: playerSpriteSheet.getSprite(19, 2) },
                { graphic: playerSpriteSheet.getSprite(20, 2) },
                { graphic: playerSpriteSheet.getSprite(21, 2) },
                { graphic: playerSpriteSheet.getSprite(22, 2) },
                { graphic: playerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", downWalk)


        this.graphics.use("up-idle")


        // configurar player para evento "hold"
        engine.input.keyboard.on("hold", (event) => {
            // detectar qualtecla está precionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // mover para esquerda
                    this.vel.x = -this.velocidade
                    this.graphics.use("left-walk")

                    // guardar ultima direcao
                    this.ultimaDirecao = "left"
                    break;

                case Keys.Right:
                case Keys.D:
                    // mover para direita
                    this.vel.x = this.velocidade
                    this.graphics.use("right-walk")

                    // guardar ultima direcao
                    this.ultimaDirecao = "right"
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    this.graphics.use("up-walk")

                    // guardar ultima direcao
                    this.ultimaDirecao = "up"
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    this.graphics.use("down-walk")

                    // guardar ultima direcao
                    this.ultimaDirecao = "down"
                    break;

                default:
                    // zera velocidade do player
                    this.vel = vec(0, 0)
                    break;
            }
        })

        // configura player para evento "release"
        engine.input.keyboard.on("release", (event) => {
            // para o player
            // para lateralmente
            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // zerar vel horizontal
                this.vel.x = 0
            }

            // para verticalmente
            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // zerar vel vertical
                this.vel.y = 0
            }

            // ao parar o player definir animação idle da ultima direção
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
            }
        })
        //Configurar o player para monitorar 
        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.F && this.temObjetoProximo) {
                console.log(this.ultimoColisor?.owner.name);
                

                // Identificar o alvo da interação
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    console.log("Essa é a mesa A");

                    // Vai para a cena passando qual o objeto da interação
                    engine.goToScene("case", {
                        sceneActivationData: {
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                    console.log("Essa é a mesa B");
                    engine.goToScene("case", {
                        sceneActivationData: {
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                    console.log("Essa é a mesa C");
                    engine.goToScene("case", {
                        sceneActivationData: {
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
            }
        }
        )
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indicar que tem um objeto próximo
        this.temObjetoProximo = true

        // registrar o ultimo objeto colidido
        this.ultimoColisor = other


    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // 
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            // 
            this.temObjetoProximo = false

            console.log("Está longe")
        }
    }
}