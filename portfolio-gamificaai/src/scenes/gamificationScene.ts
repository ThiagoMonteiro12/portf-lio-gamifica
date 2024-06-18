import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoHTML?: HTMLElement

    //Método para esmaecer um elemento
    fadeOutElement(element: HTMLElement) {
        //Pegar opacidade do elemento HTML
        let opacidade = parseFloat(element.style.opacity)
        //Repetir diminuição da opacidade
        setInterval(() => {
            //Se o elemento aida está visivel
            if (opacidade > 0) {
                //Diminui a opacidade
                opacidade -= 0.01

                //Atualizar a opacidade do elemento
                element.style.opacity = opacidade.toString()
            }

        }, 10)

    }

    // Ao entrar ou sair da cena, utiliza o feito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        

        this.backgroundColor = Color.fromHex("#403f4c")

        this.elementoHTML = document.createElement("div") as HTMLElement
        this.elementoHTML.style.opacity = "1"

        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoHTML)

        this.elementoHTML.innerHTML = '<p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.<p>'

        this.elementoHTML.classList.add("gamificacao")


        //Abobra
        let actorlogoV = new Actor({
            pos: vec(engine.drawWidth / 4, 400)
        })


        //Utilizar imagem do logo
        let imagemlogoV = Resources.Logo.toSprite()

        // Aplicar zoom na imagem - 40% de x, e 40% de y
        imagemlogoV.scale = vec(0.8, 0.8)

        // Configurar o actor para usar a imagem
        actorlogoV.graphics.add(imagemlogoV)

        // Adicionando Actor Logo na tela
        this.add(actorlogoV)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                this.fadeOutElement(this.elementoHTML!)
                engine.goToScene("exposicao")
            }
        }
        )
        
    }
    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoHTML?.remove()
    }
}