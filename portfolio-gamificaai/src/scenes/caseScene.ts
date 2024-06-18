import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    elementoHTML?: HTMLElement

    private objetoInteracao: any
    private textodaCena: string = ""

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

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    onInitialize(engine: Engine<any>): void {
        this.elementoHTML = document.createElement("div") as HTMLElement
        this.elementoHTML.style.opacity = "1"

        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoHTML)

        this.backgroundColor = Color.Gray
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                this.fadeOutElement(this.elementoHTML!)
                engine.goToScene("exposicao")
            }
        }
        )


        let actorApresentacao = new Actor({
            pos: vec(engine.drawWidth / 4.3, 400)
        })

        let imageActor = Resources.apresentacao.toSprite()

        imageActor.scale = vec(0.2, 0.2)

        actorApresentacao.graphics.add(imageActor)

        this.add(actorApresentacao)

    }
    onActivate(context: SceneActivationContext<unknown>): void {
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);


        this.elementoHTML!.style.opacity = "1"
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.textodaCena = "AOOOOOOUBA"
            this.elementoHTML!.innerHTML = this.textodaCena
            this.elementoHTML?.classList.add("gamificacao")

        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.textodaCena = "BOOOOOUUUUBA"
            this.elementoHTML!.innerHTML = this.textodaCena
            this.elementoHTML?.classList.add("gamificacao")
        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.textodaCena = "COOOOOOOUBA"
            this.elementoHTML!.innerHTML = this.textodaCena
            this.elementoHTML?.classList.add("gamificacao")
            
        }


    }
    onDeactivate(context: SceneActivationContext<undefined>): void {

        this.elementoHTML!.style.opacity = "0"

    }

}